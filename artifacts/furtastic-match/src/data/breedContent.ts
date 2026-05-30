// Long-form, SEO-structured breed content for the highest-intent breeds.
// Backward-compatible: BreedProfile renders this richer layout when a slug has
// an entry here, and falls back to the short breed_page_content for the rest.
//
// Editorial note (Wren/Vera): these four were expanded to 800+ words and
// rewritten to drop the templated/AI cadence of the original ~250-word drafts.
// Keep numbers concrete (weight, lifespan, $ ranges, exercise minutes) and the
// voice plain. New breeds: add an entry keyed by the breeds.json slug.

export interface BreedFAQ {
  q: string;
  a: string;
}

export interface BreedSection {
  h2: string;
  body: string[];
}

export interface BreedComparison {
  /** comparison slug in the form "breedA-vs-breedB" (see /compare/:slug) */
  slug: string;
  label: string;
}

export interface BreedLongForm {
  metaTitle: string;
  metaDescription: string;
  /** Lead paragraphs under the H1. */
  intro: string[];
  sections: BreedSection[];
  /** Internal links to comparison pages — feeds the breed↔comparison↔tool loop. */
  comparisons: BreedComparison[];
  faqs: BreedFAQ[];
}

export const breedContent: Record<string, BreedLongForm> = {
  'golden-retriever': {
    metaTitle: 'Golden Retriever: Family Fit, Temperament & Care (2026) | FurtasticMatch',
    metaDescription:
      'Is a Golden Retriever right for your family? Honest guide to temperament, exercise, shedding, health, and real costs — plus how to know if the breed fits your home.',
    intro: [
      `The Golden Retriever has sat near the top of America's most-popular-breed list for decades, and the reason is simple: few dogs are this easy to love and this easy to live with. A well-bred Golden is steady, affectionate, and unusually attuned to people. They read the room, lean into a bad day, and tend to treat every family member — including the toddler pulling an ear — as their responsibility.`,
      `None of that makes them low-maintenance. A Golden is a big, athletic gun dog under the teddy-bear coat, and the gap between the dog people expect and the dog they get usually comes down to underestimating the exercise, the shedding, and the vet bills. Here's the full picture before you commit.`,
    ],
    sections: [
      {
        h2: 'Is a Golden Retriever right for your family?',
        body: [
          `Goldens are one of the safest bets for households with children. They're patient by temperament, big enough to shrug off rough handling, and people-focused enough to want to be in the middle of whatever's happening. They also get along with other dogs and cats more readily than most breeds.`,
          `The honest catch is time. This is a dog that wants to be with you and needs a job to stay balanced. Goldens left alone for long workdays, or under-exercised in a small space, get bored — and a bored Golden chews, digs, and counter-surfs. If your household is busy and outdoorsy, the fit is excellent. If your days are long and sedentary, look harder before deciding.`,
        ],
      },
      {
        h2: 'Temperament: what living with a Golden is actually like',
        body: [
          `Expect a soft, biddable dog that genuinely wants to please — which is why Goldens dominate obedience, therapy, and service work. They train quickly with positive methods and tend to be gentle even when excited. Most stay playful and a little goofy well into adulthood; many breeders only half-joke that a Golden isn't really mentally mature until three.`,
          `What trips people up is assuming a sweet temperament means training takes care of itself. It doesn't. Goldens are strong, fast, and mouthy as puppies, and a 70-pound dog that never learned not to jump is a real problem. The good news is they make early training easy if you put the reps in.`,
        ],
      },
      {
        h2: 'Exercise and energy needs',
        body: [
          `Plan on 60 to 90 minutes of real activity a day — not just a stroll around the block. Goldens were bred to retrieve waterfowl for hours, and they have the stamina to match. A long walk plus a game of fetch, a swim, or a training session usually does it. Skip it and you'll see the energy come out sideways.`,
          `They're also smart enough to need mental work. Puzzle feeders, nose games, and short obedience drills tire a Golden out as much as a run. A yard helps but isn't a substitute for engagement — a Golden alone in a yard is just a bored dog in a bigger room.`,
        ],
      },
      {
        h2: 'Grooming and shedding (there will be hair)',
        body: [
          `That gorgeous double coat sheds year-round and blows out heavily twice a year. Brush two to three times a week most of the year, and daily during the spring and fall coat changes, or your floors and furniture will tell the story. A bath every six to eight weeks and regular ear checks (those floppy ears trap moisture) round it out.`,
          `Budget for either the time or a groomer every couple of months. One thing not to do: shave a Golden's coat in summer. The double coat insulates against heat as well as cold, and shaving can leave the skin exposed and the coat slow to grow back correctly.`,
        ],
      },
      {
        h2: 'Health and lifespan — the honest version',
        body: [
          `Goldens typically live 10 to 12 years. The hard truth the breed is known for is cancer: studies put the lifetime cancer rate well above half, one of the highest of any breed. That's not a reason to avoid Goldens, but it is a reason to choose a breeder who health-tests and to keep up with annual vet visits as your dog ages.`,
          `Beyond cancer, watch for hip and elbow dysplasia, certain heart conditions (subvalvular aortic stenosis), and eye issues. A responsible breeder will show you OFA or equivalent clearances for hips, elbows, heart, and eyes on both parents. Pet insurance is worth pricing out early, while your dog is young and pre-existing conditions aren't yet on the table.`,
        ],
      },
      {
        h2: 'What a Golden Retriever actually costs',
        body: [
          `A well-bred puppy from a health-testing breeder generally runs $1,500 to $3,500, and the deposit-and-waitlist process can take months — which is normal and a good sign. Rescue is a cheaper, faster route if you're open to an adult dog; breed-specific Golden rescues exist in most regions.`,
          `The purchase price is the small part. Figure $1,500 to $3,000 a year for food, preventatives, grooming, and routine vet care, more in years with a health issue. Goldens are big eaters and big dogs, so everything from food to boarding costs more than it would for a small breed.`,
        ],
      },
    ],
    comparisons: [
      { slug: 'golden-retriever-vs-labrador-retriever', label: 'Golden Retriever vs. Labrador Retriever' },
      { slug: 'golden-retriever-vs-bernese-mountain-dog', label: 'Golden Retriever vs. Bernese Mountain Dog' },
    ],
    faqs: [
      {
        q: 'Are Golden Retrievers good for first-time owners?',
        a: `Yes, with a caveat. Their trainability and forgiving temperament make them one of the better large breeds for beginners. The caveat is exercise and grooming — first-timers who underestimate the daily activity and year-round shedding are the ones who struggle.`,
      },
      {
        q: 'Do Golden Retrievers shed a lot?',
        a: `Heavily, and all year, with two big seasonal blowouts. Plan on brushing several times a week and daily during coat changes. If a low-shedding dog is a hard requirement, a Golden isn't your breed.`,
      },
      {
        q: 'How much exercise does a Golden Retriever need?',
        a: `About 60–90 minutes of real activity a day, plus mental stimulation. Walks alone usually aren't enough; fetch, swimming, and training sessions are what actually settle the breed.`,
      },
      {
        q: 'How long do Golden Retrievers live?',
        a: `Typically 10–12 years. Cancer is the breed's leading health concern, so health-tested parents and consistent veterinary care matter.`,
      },
    ],
  },

  'labrador-retriever': {
    metaTitle: 'Labrador Retriever: Family Fit, Temperament & Care (2026) | FurtasticMatch',
    metaDescription:
      'Thinking about a Labrador Retriever? Straight talk on temperament, exercise needs, shedding, health, and cost — and how to tell if a Lab fits your household.',
    intro: [
      `The Labrador Retriever has been America's number-one breed for more than three decades, and it earned the spot honestly. Labs are outgoing, food-motivated, endlessly trainable, and built to be in the thick of family life. They're the default recommendation for active households for a reason.`,
      `They're also a lot of dog. A Lab is a powerful working retriever with an appetite to match and a puppyhood that lasts longer than most people expect. Get the exercise and training right and you have one of the best family dogs alive; get it wrong and you have 70 pounds of bored, hungry chaos.`,
    ],
    sections: [
      {
        h2: 'Is a Labrador Retriever right for your family?',
        body: [
          `Labs are about as kid-friendly as breeds come — sturdy, tolerant, and genuinely happy in a busy, noisy house. They bond to the whole family rather than one person, and they're typically social with other dogs and strangers, which makes them poor guard dogs but excellent companions.`,
          `The fit breaks down in two situations: not enough exercise, and not enough supervision around young kids while the dog is still a gangly adolescent. A young Lab is strong and bouncy and will knock over a small child by accident, not malice. Active families with the time to train come out ahead.`,
        ],
      },
      {
        h2: 'Temperament: what living with a Lab is actually like',
        body: [
          `Expect a confident, upbeat, food-obsessed dog that learns fast and forgives quickly. That food drive is your best training tool — Labs will work hard for a piece of kibble — and also your biggest management problem, because they'll counter-surf, raid trash, and eat things they shouldn't if given the chance.`,
          `Labs stay puppyish for two to three years. They're mouthy as youngsters and need early work on bite inhibition and impulse control. None of it is hard; it just has to actually happen. A trained adult Lab is one of the steadiest dogs you'll ever meet.`,
        ],
      },
      {
        h2: 'Exercise and energy needs',
        body: [
          `Budget 60 to 90 minutes of vigorous activity daily. Labs were bred to retrieve in cold water all day, and that engine doesn't idle well. Fetch, swimming, hiking, and running are ideal; a leashed walk alone rarely takes the edge off a healthy young Lab.`,
          `Pair the physical work with mental work — scent games, training, puzzle toys. A tired Lab is a good Lab. An under-exercised one channels the energy into chewing, digging, and general mischief, and that's the single most common reason Labs end up in rescue.`,
        ],
      },
      {
        h2: 'Grooming and shedding',
        body: [
          `Grooming is genuinely easy: a short, dense double coat that needs a weekly brush most of the year and more during seasonal sheds. They're low-fuss on baths and don't need professional grooming.`,
          `Don't let "low grooming" read as "low shedding," though. Labs shed steadily and noticeably — that short hair works its way into everything. A weekly once-over with a de-shedding tool keeps it manageable, but a fur-free home isn't on the menu.`,
        ],
      },
      {
        h2: 'Health and lifespan — the honest version',
        body: [
          `Labs generally live 11 to 13 years. The breed's defining health risk is weight: Labs are prone to obesity (many carry a gene variant that drives appetite), and excess weight worsens nearly every other issue. Keeping a Lab lean is the highest-impact thing an owner can do for its lifespan.`,
          `Watch also for hip and elbow dysplasia, exercise-induced collapse (EIC), and eye conditions like progressive retinal atrophy. A good breeder tests parents for hips, elbows, eyes, and EIC. Because they'll eat almost anything, foreign-body surgeries are a common (and expensive) emergency — another argument for pet insurance bought early.`,
        ],
      },
      {
        h2: 'What a Labrador Retriever actually costs',
        body: [
          `Expect $1,200 to $3,000 for a puppy from a health-testing breeder, with field and show lines priced differently. Labs are one of the most common breeds in shelters and rescues, so adoption is a realistic and far cheaper option if you're open to it.`,
          `Ongoing, plan on roughly $1,500 to $2,800 a year. They eat a lot, and their appetite means you'll spend on durable toys and the occasional vet visit for something they swallowed. Lean feeding actually saves money here by heading off weight-driven health problems.`,
        ],
      },
    ],
    comparisons: [
      { slug: 'golden-retriever-vs-labrador-retriever', label: 'Labrador Retriever vs. Golden Retriever' },
      { slug: 'labrador-retriever-vs-german-shepherd', label: 'Labrador Retriever vs. German Shepherd' },
    ],
    faqs: [
      {
        q: 'Are Labradors good for first-time owners?',
        a: `They're one of the top picks for beginners thanks to their trainability and even temperament. The two things first-timers underestimate are the exercise requirement and how long the destructive puppy phase lasts — plan for both.`,
      },
      {
        q: 'Do Labradors shed a lot?',
        a: `Yes. The coat is low-effort to groom but sheds steadily year-round with heavier seasonal sheds. Weekly brushing helps, but expect hair on your clothes and floors.`,
      },
      {
        q: 'How much exercise does a Labrador need?',
        a: `60–90 minutes of vigorous activity a day, plus mental stimulation. Fetch and swimming suit them perfectly; walks alone usually aren't enough for a young Lab.`,
      },
      {
        q: 'Why do Labradors gain weight so easily?',
        a: `Many Labs carry a gene variant linked to a stronger appetite, and the breed is prone to obesity. Measured meals, limited treats, and a lean body condition are essential to a long, healthy life.`,
      },
    ],
  },

  'french-bulldog': {
    metaTitle: 'French Bulldog: Family Fit, Temperament & Care (2026) | FurtasticMatch',
    metaDescription:
      'Considering a French Bulldog? Honest guide to temperament, low exercise needs, the serious health trade-offs, and real costs — and whether a Frenchie fits your life.',
    intro: [
      `The French Bulldog became the most-registered breed in America by being almost perfectly suited to modern life: small, quiet, affectionate, and content in an apartment. Frenchies are charming, a little clownish, and deeply attached to their people. For city dwellers and anyone wanting a low-exercise companion, the appeal is obvious.`,
      `But no popular breed comes with more important fine print. The same flat face that gives the Frenchie its look also creates real, lifelong health risks and high costs. This is a breed you should go into with your eyes open, not on impulse.`,
    ],
    sections: [
      {
        h2: 'Is a French Bulldog right for your family?',
        body: [
          `Frenchies fit small spaces and quieter routines beautifully. They're affectionate, generally good with respectful children, and rarely bark much, which keeps the neighbors happy. They want to be near you constantly — a Frenchie is a Velcro dog — so they suit people who are home a lot and struggle with long stretches alone.`,
          `They're a poor fit for families wanting a hiking or running buddy, for homes where the dog will be alone all day, and for anyone on a tight budget who can't absorb surprise vet bills. They also don't tolerate heat and can't really swim, so pool and hot-climate households need to plan around that.`,
        ],
      },
      {
        h2: 'Temperament: what living with a Frenchie is actually like',
        body: [
          `Expect an entertaining, stubborn, people-first little dog. Frenchies are smart but not especially eager to obey, so training works best when it's short, fun, and food-driven. They're sensitive to tone and shut down under harsh correction.`,
          `They form intense attachments and are prone to separation anxiety, so crate training and gradual alone-time practice from puppyhood pay off. Most are friendly with strangers and other pets. The flip side of that devotion is that a Frenchie really does not want to be left behind.`,
        ],
      },
      {
        h2: 'Exercise and energy needs',
        body: [
          `This is one of the lowest-exercise breeds going: two or three short walks and some indoor play usually cover it. A Frenchie is happy to be a couch companion, which is a big part of the apartment appeal.`,
          `The critical rule is heat. Because of their flat faces, Frenchies overheat dangerously fast and can't cool themselves efficiently by panting. Walk early or late on hot days, never leave one in a warm car or yard, and watch for labored breathing. Most Frenchies also sink rather than swim — never leave one unattended near water.`,
        ],
      },
      {
        h2: 'Grooming and shedding',
        body: [
          `The short coat is easy: a weekly brush and the occasional bath. The real grooming work is the wrinkles. Those facial folds and the tail pocket trap moisture and debris and need regular cleaning and drying to prevent infections.`,
          `Stay on top of ears and nails too. None of it takes long, but skipping the wrinkle care is how minor irritation turns into a vet visit. Factor a few minutes of folds-and-ears maintenance into the weekly routine.`,
        ],
      },
      {
        h2: 'Health and lifespan — the honest version',
        body: [
          `This is the section that matters most. French Bulldogs are a brachycephalic (flat-faced) breed, and many have some degree of Brachycephalic Obstructive Airway Syndrome — narrowed nostrils and airways that make breathing, exercise, and heat regulation hard. Corrective airway surgery is common. They're also prone to spinal disease (IVDD), allergies and skin-fold infections, and eye problems.`,
          `A huge share of Frenchies are born by C-section because the puppies' heads are too large for natural birth — which is part of why they're expensive. Lifespan runs roughly 10 to 12 years, but quality of life depends heavily on breeding. Buy only from a breeder who prioritizes open nostrils, sound airways, and health-tested parents over color and "rare" markings.`,
        ],
      },
      {
        h2: 'What a French Bulldog actually costs',
        body: [
          `Frenchies are among the most expensive common breeds: $3,000 to $8,000 or more from a reputable breeder, and "exotic" colors are marked up further (and often come from less responsible breeding). Be cautious — the breed's popularity has drawn in volume breeders and theft, so vet the source carefully.`,
          `Lifetime costs run high too. Between airway issues, skin and spinal problems, and the odds of surgery, annual vet spend can climb fast, and many owners consider pet insurance close to mandatory for this breed. Budget meaningfully above what a typical small dog costs.`,
        ],
      },
    ],
    comparisons: [
      { slug: 'french-bulldog-vs-boston-terrier', label: 'French Bulldog vs. Boston Terrier' },
      { slug: 'french-bulldog-vs-bulldog', label: 'French Bulldog vs. Bulldog' },
    ],
    faqs: [
      {
        q: 'Are French Bulldogs good apartment dogs?',
        a: `Yes — they're quiet, small, and need little exercise, which makes them one of the better apartment breeds. The trade-off is their health needs and dislike of being left alone, not their space requirements.`,
      },
      {
        q: 'Why are French Bulldogs so expensive?',
        a: `Most litters require artificial insemination and C-section delivery, and responsible health testing adds cost. Combined with high demand, that pushes prices to $3,000–$8,000+ from reputable breeders.`,
      },
      {
        q: 'Do French Bulldogs have a lot of health problems?',
        a: `They can. As a flat-faced breed they're prone to breathing difficulties (BOAS), heat intolerance, spinal disease, and skin issues. Choosing a breeder who selects for open airways and health-tests parents makes a real difference.`,
      },
      {
        q: 'Can French Bulldogs swim?',
        a: `Most can't. Their dense, front-heavy build and flat faces make swimming dangerous, so never leave a Frenchie unsupervised near a pool or open water.`,
      },
    ],
  },

  'cavalier-king-charles-spaniel': {
    metaTitle: 'Cavalier King Charles Spaniel: Family Fit & Care (2026) | FurtasticMatch',
    metaDescription:
      'Is a Cavalier King Charles Spaniel right for you? Honest guide to their gentle temperament, modest exercise needs, the breed\'s heart and neurological risks, and costs.',
    intro: [
      `If you want a small dog with the soul of a spaniel and the manners of a lapdog, the Cavalier King Charles Spaniel is hard to beat. They're gentle, sweet-natured, and adaptable — equally happy curled on the couch or trotting along on a walk. Few breeds are this universally easy to get along with.`,
      `The hard part of owning a Cavalier isn't the temperament; it's the health. The breed carries serious, well-documented genetic risks, and a responsible purchase means understanding them up front. Done right, a Cavalier is one of the most affectionate companions you can bring home.`,
    ],
    sections: [
      {
        h2: 'Is a Cavalier King Charles Spaniel right for your family?',
        body: [
          `Cavaliers are excellent family dogs and one of the gentler choices for homes with children and other pets. They're small, soft-mouthed, and friendly to nearly everyone, with none of the snappiness that can come with some toy breeds. They suit first-time owners, seniors, and apartment life equally well.`,
          `Their one real demand is company. Cavaliers are companion dogs to the core and don't do well left alone for long days — separation anxiety is common. They're a great fit for someone home often and a poor fit for a household that's out from morning to night.`,
        ],
      },
      {
        h2: 'Temperament: what living with a Cavalier is actually like',
        body: [
          `Expect an affectionate, eager-to-please dog that wants to be on your lap or at your feet. They're more biddable than most toy breeds and respond beautifully to gentle, reward-based training. Housetraining can take a little patience, as it can with many small dogs, but the breed is genuinely willing.`,
          `That spaniel heritage still shows: many Cavaliers love a sniffy walk and will chase a bird or squirrel, so a reliable recall and a secure yard matter. They're not yappy or high-strung — the defining trait is sweetness, and it's consistent across the breed.`,
        ],
      },
      {
        h2: 'Exercise and energy needs',
        body: [
          `Moderate and flexible. A couple of short walks plus some play — around 30 to 60 minutes total — keeps a Cavalier happy. They'll happily do more if you're active, and they'll settle for less on a quiet day, which is part of their easy reputation.`,
          `Light training and sniff-based games cover the mental side. Just don't mistake "adaptable" for "needs nothing" — a Cavalier with zero engagement still gets bored, and a daily walk does as much for their attachment to you as it does for their body.`,
        ],
      },
      {
        h2: 'Grooming and shedding',
        body: [
          `The silky, medium-length coat needs brushing three or so times a week to stay tangle-free, with extra attention to the feathering on the ears, legs, and tail where mats form. Many owners do a bath every few weeks and a light trim, though the breed standard keeps the coat natural.`,
          `Those long, low-set ears need regular checking and cleaning, since the shape traps moisture and invites infection. Cavaliers shed moderately — more than a poodle, less than a retriever — so a steady brushing routine keeps it under control.`,
        ],
      },
      {
        h2: 'Health and lifespan — the honest version',
        body: [
          `This is the part to take seriously. Cavaliers have a high incidence of mitral valve disease, a heart condition that affects a majority of the breed by older age and is the leading cause of death. They're also predisposed to syringomyelia, a painful neurological condition linked to skull shape. Both are major reasons to buy only from breeders who follow heart and MRI screening protocols for their breeding dogs.`,
          `Beyond those, watch for hip dysplasia, patellar luxation, and eye conditions. Lifespan is typically 9 to 14 years and depends heavily on the breeding behind the dog. A breeder who can show cardiologist clearances on the parents — not just a vet's once-over — is worth waiting and paying for.`,
        ],
      },
      {
        h2: 'What a Cavalier King Charles Spaniel actually costs',
        body: [
          `A puppy from a breeder who does the recommended heart and neurological screening generally runs $1,800 to $4,000. Paying less often means skipping exactly the health testing that protects against the breed's biggest risks, so cheap Cavaliers can get expensive fast.`,
          `Ongoing costs are moderate for a small dog — roughly $1,000 to $2,000 a year — but the realistic possibility of cardiac care later in life makes pet insurance, bought while the dog is young and healthy, a smart move for this breed in particular.`,
        ],
      },
    ],
    comparisons: [
      { slug: 'cavalier-king-charles-spaniel-vs-havanese', label: 'Cavalier vs. Havanese' },
      { slug: 'cavalier-king-charles-spaniel-vs-shih-tzu', label: 'Cavalier vs. Shih Tzu' },
    ],
    faqs: [
      {
        q: 'Are Cavalier King Charles Spaniels good for families?',
        a: `Very. They're gentle, friendly with children and other pets, and adaptable to almost any living situation, which makes them one of the easier small breeds for families and first-time owners alike.`,
      },
      {
        q: 'Do Cavaliers need a lot of exercise?',
        a: `No — about 30–60 minutes a day across a couple of walks and some play is plenty. They'll match an active owner but are just as content with a quieter routine.`,
      },
      {
        q: 'What health problems do Cavaliers have?',
        a: `The breed is prone to mitral valve heart disease and syringomyelia, among other issues. Buying from a breeder who heart- and MRI-screens their breeding dogs is the single most important step you can take.`,
      },
      {
        q: 'Can Cavaliers be left alone?',
        a: `Not for long. They're companion dogs and prone to separation anxiety, so they fit households where someone is home much of the day far better than all-day-empty homes.`,
      },
    ],
  },
};
