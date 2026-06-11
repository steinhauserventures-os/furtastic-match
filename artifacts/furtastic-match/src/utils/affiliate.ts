export const AFFILIATE_PROGRAMS = {
  amazon: 'amazon_associates',
  embark: 'embark_dna',
  chewy: 'chewy',
  trupanion: 'trupanion',
  lemonade: 'lemonade_pet',
  nexbie: 'nexbie_awin',
  akc: 'akc_marketplace',
  gooddog: 'gooddog',
} as const;

export type AffiliateProgram = keyof typeof AFFILIATE_PROGRAMS;

export function affiliateUrl(baseUrl: string, program: AffiliateProgram): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('utm_source', 'furtasticmatch');
    url.searchParams.set('utm_medium', 'affiliate');
    url.searchParams.set('utm_campaign', AFFILIATE_PROGRAMS[program]);
    return url.toString();
  } catch {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}utm_source=furtasticmatch&utm_medium=affiliate&utm_campaign=${AFFILIATE_PROGRAMS[program]}`;
  }
}
