import breedsData from '../data/breeds.json';

export interface QuizAnswers {
  q1_mode: 'none' | 'one' | 'two';
  q1_breed1: string;
  q1_breed2: string;
  who: string;
  activity: number;
  space: string;
  grooming: number;
  experience: string;
  size: string;
  kids: number;
}

export interface Breed {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  illustration_bg: string[];
  size: string;
  activity_level: number;
  space: number;
  grooming: number;
  experience_level: number;
  good_with_kids: number;
  size_preference: number;
  lifestyle: number;
  wildcard_eligible: boolean;
  sponsored: boolean;
  last_updated: string;
  affiliate_link: string;
  description: string;
  why_it_fits: { family: string; couple: string; solo: string };
  meta_title: string;
  meta_description: string;
  breed_page_content: {
    intro: string;
    traits: string;
    family_fit: string;
    grooming: string;
    activity: string;
    cost: string;
    fun_fact?: string;
  };
}

export interface MatchResult {
  matches: (Breed & { score: number })[];
  wildcard: (Breed & { score: number }) | null;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function fuzzyMatchBreed(input: string, breed: Breed): boolean {
  const inp = input.toLowerCase().trim();
  if (!inp || inp.length < 2) return false;
  const name = breed.name.toLowerCase();
  const slug = breed.slug;
  if (name.includes(inp) || slug.includes(inp.replace(/\s+/g, '-'))) return true;
  const inputWords = inp.split(/\s+/);
  const breedWords = name.split(/[\s-]+/);
  return inputWords.some(iw =>
    breedWords.some(bw => {
      if (bw.length < 3) return false;
      const maxDist = Math.floor(Math.max(iw.length, bw.length) / 4);
      return levenshtein(iw, bw) <= maxDist;
    })
  );
}

// Scoring scale: all breed fields are 1-5.
// ----- Shared answer→scale mappings (single source of truth for scoring AND explainMatch) -----
// Space — breed.space: 1=needs lots of outdoor space, 5=fine in apartment.
const SPACE_SCORES: Record<string, number> = {
  apartment: 5,
  'house-no-yard': 4,
  'house-yard': 2,
  rural: 1,
};
// Experience — breed.experience_level: 1=beginner, 5=expert needed.
const EXP_SCORES: Record<string, number> = { first: 1, some: 3, seasoned: 5 };
// Size — breed.size_preference: 1=tiny, 5=very large.
const SIZE_RANGES: Record<string, [number, number]> = {
  small: [1, 2],
  medium: [2, 4],
  large: [3, 5],
  any: [1, 5],
};
// 0-100 slider (activity, grooming) → 1-5 breed scale.
const sliderToScale = (v: number) => Math.max(1, Math.min(5, Math.round((v * 4) / 100) + 1));

// Max possible score = 20 + 10 + 15 + 10 + 15 + 10 + 10 + 10 = 100
function scoreBreed(breed: Breed, answers: QuizAnswers): number {
  let score = 0;

  // Activity (20 pts) — 0-100 slider → 1-5 breed scale
  const userActivity = sliderToScale(answers.activity);
  const activityDiff = Math.abs(breed.activity_level - userActivity);
  score += (1 - activityDiff / 4) * 20;

  // Lifestyle (10 pts) — same axis; captures overall active/homebody temperament
  const lifestyleDiff = Math.abs(breed.lifestyle - userActivity);
  score += (1 - lifestyleDiff / 4) * 10;

  // Space (15 pts)
  const userSpace = SPACE_SCORES[answers.space] ?? 3;
  const spaceDiff = Math.abs(breed.space - userSpace);
  score += (1 - spaceDiff / 4) * 15;

  // Grooming (10 pts) — 0-100 slider → 1-5 breed scale
  const userGrooming = sliderToScale(answers.grooming);
  const groomingDiff = Math.abs(breed.grooming - userGrooming);
  score += (1 - groomingDiff / 4) * 10;

  // Experience (15 pts)
  const userExp = EXP_SCORES[answers.experience] ?? 1;
  const expDiff = Math.abs(breed.experience_level - userExp);
  score += (1 - expDiff / 4) * 15;

  // Size preference (10 pts)
  const [minS, maxS] = SIZE_RANGES[answers.size] ?? [1, 5];
  if (breed.size_preference >= minS && breed.size_preference <= maxS) {
    score += 10;
  } else {
    const sizeDiff = Math.min(
      Math.abs(breed.size_preference - minS),
      Math.abs(breed.size_preference - maxS)
    );
    score += Math.max(0, (1 - sizeDiff / 4) * 10);
  }

  // Kids compatibility (10 pts) — weighted by how important kids are (slider)
  const kidsImportance = answers.kids / 100;
  score += breed.good_with_kids * kidsImportance * 2; // max: 5 × 1 × 2 = 10

  // Household type bonus (10 pts)
  if (answers.who === 'family' && breed.good_with_kids >= 4) {
    score += 10;
  } else if (answers.who === 'family') {
    score += breed.good_with_kids * 2; // partial credit, max 10
  } else {
    score += 5; // couple/solo get a flat neutral bonus
  }

  return Math.round(score);
}

// ----- Personalization for the results page -----
// Display labels keyed off the same answer values the quiz stores.
const ACTIVITY_LABEL = ['', 'laid-back', 'easygoing', 'moderately active', 'very active', 'high-energy'];
const GROOMING_LABEL = ['', 'minimal', 'low', 'moderate', 'regular', 'high'];
const SPACE_LABEL: Record<string, string> = {
  apartment: 'apartment or small space',
  'house-no-yard': 'home',
  'house-yard': 'house with a yard',
  rural: 'wide-open space',
};
const SIZE_LABEL: Record<string, string> = {
  small: 'small',
  medium: 'medium-sized',
  large: 'large',
  any: '',
};

export interface MatchExplanation {
  // who-appropriate authored sentence (family / couple / solo)
  blurb: string;
  // up to 3 reflective reasons tying the user's answers to this breed
  reasons: string[];
}

// Builds the "why this matched you" content. Reuses the SAME scale mappings as
// scoreBreed, and only surfaces an axis as a "reason" when the breed actually
// aligns with the user's answer (diff ≤ 1, or in-range for size) — so a reason
// is never a claim the matching engine wouldn't itself make.
export function explainMatch(breed: Breed, answers: QuizAnswers): MatchExplanation {
  const blurb =
    answers.who === 'couple' ? breed.why_it_fits.couple :
    answers.who === 'solo' ? breed.why_it_fits.solo :
    breed.why_it_fits.family;

  const candidates: { diff: number; text: string }[] = [];

  // Activity
  const ua = sliderToScale(answers.activity);
  const aDiff = Math.abs(breed.activity_level - ua);
  if (aDiff <= 1) candidates.push({ diff: aDiff, text: `Energy level fits your ${ACTIVITY_LABEL[ua]} household.` });

  // Space
  if (answers.space in SPACE_SCORES) {
    const sDiff = Math.abs(breed.space - SPACE_SCORES[answers.space]);
    if (sDiff <= 1) candidates.push({ diff: sDiff, text: `Well-suited to your ${SPACE_LABEL[answers.space]}.` });
  }

  // Grooming
  const ug = sliderToScale(answers.grooming);
  const gDiff = Math.abs(breed.grooming - ug);
  if (gDiff <= 1) candidates.push({ diff: gDiff, text: `Grooming needs line up with the ${GROOMING_LABEL[ug]} upkeep you picked.` });

  // Experience
  if (answers.experience in EXP_SCORES) {
    const eDiff = Math.abs(breed.experience_level - EXP_SCORES[answers.experience]);
    if (eDiff <= 1) {
      const text =
        answers.experience === 'first' ? 'Beginner-friendly — a solid pick for a first-time owner.' :
        answers.experience === 'seasoned' ? 'Rewarding for an experienced owner like you.' :
        'A good fit for your level of dog experience.';
      candidates.push({ diff: eDiff, text });
    }
  }

  // Size
  if (answers.size !== 'any' && answers.size in SIZE_RANGES) {
    const [minS, maxS] = SIZE_RANGES[answers.size];
    if (breed.size_preference >= minS && breed.size_preference <= maxS) {
      candidates.push({ diff: 0, text: `Lands right in your preferred ${SIZE_LABEL[answers.size]} size range.` });
    }
  }

  // Kids — only when the user said it matters and the breed is genuinely strong with kids
  if (answers.kids >= 60 && breed.good_with_kids >= 4) {
    candidates.push({ diff: 5 - breed.good_with_kids, text: 'Known for being great with kids — which you told us matters.' });
  }

  candidates.sort((a, b) => a.diff - b.diff);
  return { blurb, reasons: candidates.slice(0, 3).map((c) => c.text) };
}

export function runMatchingEngine(answers: QuizAnswers): MatchResult {
  const breeds = breedsData as Breed[];
  const namedInputs = [answers.q1_breed1, answers.q1_breed2].filter(s => s && s.trim().length > 1);
  const scored = breeds.map((b) => {
    let s = scoreBreed(b, answers);
    if (namedInputs.some((inp) => fuzzyMatchBreed(inp, b))) {
      s += 60;
    }
    return { ...b, score: s };
  });
  scored.sort((a, b) => b.score - a.score);
  const top3 = scored.slice(0, 3);
  const top3Ids = new Set(top3.map((b) => b.id));
  const wildcard = scored.find((b) => !top3Ids.has(b.id) && b.wildcard_eligible) || null;
  return { matches: top3, wildcard };
}

export function encodeResults(matchIds: string[], wildcardId: string | null): string {
  return btoa(JSON.stringify([...matchIds, wildcardId]));
}

export function decodeResults(hash: string): { matchIds: string[]; wildcardId: string | null } {
  try {
    const arr = JSON.parse(atob(hash)) as (string | null)[];
    return { matchIds: arr.slice(0, 3) as string[], wildcardId: arr[3] };
  } catch {
    return { matchIds: [], wildcardId: null };
  }
}

export function getBreedById(id: string): Breed | undefined {
  return (breedsData as Breed[]).find((b) => b.id === id);
}

export function getBreedBySlug(slug: string): Breed | undefined {
  return (breedsData as Breed[]).find((b) => b.slug === slug);
}

export function getAllBreeds(): Breed[] {
  return breedsData as Breed[];
}
