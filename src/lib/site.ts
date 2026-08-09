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
  firmLegalName: 'Scarinci & Hollenbeck, LLC',
  firmUrl: 'https://scarincihollenbeck.com',
  profileUrl: 'https://scarincihollenbeck.com/attorneys/jay-r-mcdaniel',
  // Outlook Bookings page for the "Schedule a strategy call" CTA.
  bookingUrl:
    'https://outlook.office.com/bookwithme/user/e3152abf19db458089a2e936b0082b49@sh-law.com/meetingtype/GAHEBwyjuU6fohpaycDa7w2?anonymous&ismsaljsauthenabled&ep=mlink',
  offices: 'Little Falls & Red Bank, NJ',
  // Firm offices for the footer identification block. Little Falls is the main
  // office and carries the firm telephone; the others show address only.
  firmOffices: [
    { city: 'Little Falls, NJ', lines: ['150 Clove Road, 9th Floor', 'Little Falls, NJ 07424'], phone: '201-896-4100' },
    { city: 'Red Bank, NJ', lines: ['331 Newman Springs Road', 'Building 3, Suite 310', 'Red Bank, NJ 07701-5692'], phone: '' },
    { city: 'New York, NY', lines: ['519 8th Avenue, 25th Floor', 'New York, NY 10018'], phone: '' },
  ],
  phone: '(201) 896-7042',
  url: 'https://jaymcdaniel.com',
  email: 'jmcdaniel@sh-law.com',
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

// A tag earns its own /topic/[tag]/ archive page (and a link in the topic index
// and sidebar) only once this many posts carry it. Below the threshold a tag
// still renders — as a plain, unlinked label — but gets no page, so the site
// never ships thin, near-empty archive pages that read as low-value content.
// Lower to 1 to give every tag a page as the archive fills out.
export const TAG_INDEX_MIN = 2;

export function pillarBySlug(slug: string) {
  return PILLARS.find((p) => p.slug === slug);
}

export function pillarByLabel(label: string) {
  return PILLARS.find((p) => p.label === label);
}

// Build a mailto link for the "Email me" contact affordance. Pass a subject to
// pre-fill it (e.g. the article title) so inbound mail is easy to triage.
export function mailto(subject = 'Inquiry via jaymcdaniel.com'): string {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
}
