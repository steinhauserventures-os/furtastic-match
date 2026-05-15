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
// Max possible score = 20 + 10 + 15 + 10 + 15 + 10 + 10 + 10 = 100
function scoreBreed(breed: Breed, answers: QuizAnswers): number {
  let score = 0;

  // Activity (20 pts) — 0-100 slider → 1-5 breed scale
  const userActivity = Math.max(1, Math.min(5, Math.round(answers.activity * 4 / 100) + 1));
  const activityDiff = Math.abs(breed.activity_level - userActivity);
  score += (1 - activityDiff / 4) * 20;

  // Lifestyle (10 pts) — same axis; captures overall active/homebody temperament
  const lifestyleDiff = Math.abs(breed.lifestyle - userActivity);
  score += (1 - lifestyleDiff / 4) * 10;

  // Space (15 pts) — breed.space: 1=needs lots of outdoor space, 5=fine in apartment
  // Quiz: apartment→5, house-no-yard→4, house-yard→2, rural→1
  const spaceScores: Record<string, number> = {
    apartment: 5,
    'house-no-yard': 4,
    'house-yard': 2,
    rural: 1,
  };
  const userSpace = spaceScores[answers.space] ?? 3;
  const spaceDiff = Math.abs(breed.space - userSpace);
  score += (1 - spaceDiff / 4) * 15;

  // Grooming (10 pts) — 0-100 slider → 1-5 breed scale
  const userGrooming = Math.max(1, Math.min(5, Math.round(answers.grooming * 4 / 100) + 1));
  const groomingDiff = Math.abs(breed.grooming - userGrooming);
  score += (1 - groomingDiff / 4) * 10;

  // Experience (15 pts) — breed.experience_level: 1=beginner, 5=expert needed
  // Quiz: first→1, some→3, seasoned→5
  const expScores: Record<string, number> = { first: 1, some: 3, seasoned: 5 };
  const userExp = expScores[answers.experience] ?? 1;
  const expDiff = Math.abs(breed.experience_level - userExp);
  score += (1 - expDiff / 4) * 15;

  // Size preference (10 pts) — breed.size_preference: 1=tiny, 5=very large
  // Quiz: small→[1,2], medium→[2,4], large→[3,5], any→[1,5]
  const sizeRanges: Record<string, [number, number]> = {
    small: [1, 2],
    medium: [2, 4],
    large: [3, 5],
    any: [1, 5],
  };
  const [minS, maxS] = sizeRanges[answers.size] ?? [1, 5];
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
