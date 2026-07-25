// Central site configuration. One place to change identity, nav, and pillars.

export const SITE = {
  name: 'Jay McDaniel',
  wordmarkFirst: 'Jay',
  wordmarkLast: 'McDaniel',
  tagline: 'Valuation Counsel to Closely Held Businesses',
  creds: 'Attorney · Certified Valuation Analyst (CVA) · Certified Exit Planning Advisor (CEPA)',
  authorName: 'Jay R. McDaniel',
  authorByline: 'Jay R. McDaniel, CVA, CEPA',
  authorCreds: 'Esq. · CVA · CEPA',
  firm: 'Scarinci Hollenbeck',
  offices: 'Little Falls & Red Bank, NJ',
  phone: '(973) 602-3915',
  url: 'https://jaymcdaniel.com',
  newsletter: 'The Valuation Letter', // Section 9 open decision — confirm/replace.
  // sameAs links for the Person schema (Section 8). Fill real URLs before launch.
  sameAs: [
    'https://www.linkedin.com/in/jayrmcdaniel',
    'https://www.scarincihollenbeck.com/',
    'https://www.youtube.com/@CloselyHeld',
  ],
};

// Pillars: label + subdirectory slug + landing headnote (Section 6).
export const PILLARS = [
  {
    label: 'Valuation',
    slug: 'valuation',
    filter: 'valuation',
    headnote:
      'Valuation is the capability that travels into every arena a closely held business can end up in — a court-ordered buyout, a matrimonial case, a gift-tax examination, a sale. This is the reference desk for the questions that decide the number: which standard of value governs, what drives it up or down, and how a record is built to hold. Written for owners and for the attorneys who send valuation problems my way.',
  },
  {
    label: 'Business Divorce',
    slug: 'business-divorce',
    filter: 'divorce',
    headnote:
      'When owners of a closely held business decide they can no longer own it together, the fight is almost always about two things: control and the number. These pieces cover oppression, deadlock, fiduciary duty, forced buyouts, and the buy-sell mechanics that turn a stalemate into a price — the proven vertical inside the valuation practice.',
  },
  {
    label: 'Exit & Succession',
    slug: 'exit-succession',
    filter: 'exit',
    headnote:
      'Most owners discover what caps their multiple only when it is too late to fix. This is the CEPA practice in writing: closing the value gaps — owner dependence, customer concentration, undocumented process — in the years before a sale or transfer, so the business is worth what the owner thinks it is when the time comes to realize it.',
  },
] as const;

// Cross-cutting tags that get archive pages (Section 3). Others render as plain labels.
export const TAG_SLUGS: Record<string, string> = {
  Matrimonial: 'matrimonial',
  'Tax Controversy': 'tax-controversy',
  'Estate & Gift': 'estate-gift',
  Dissolution: 'dissolution',
  'Buy-Sell': 'buy-sell',
  'Fiduciary Duty': 'fiduciary-duty',
  Deadlock: 'deadlock',
};

export function tagSlug(tag: string): string {
  return TAG_SLUGS[tag] ?? tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function pillarBySlug(slug: string) {
  return PILLARS.find((p) => p.slug === slug);
}

export function pillarByLabel(label: string) {
  return PILLARS.find((p) => p.label === label);
}
