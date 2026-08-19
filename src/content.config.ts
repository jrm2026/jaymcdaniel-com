import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The three pillars are a closed set (build brief, Section 7).
export const PILLARS = ['Valuation', 'Business Divorce', 'Exit & Succession'] as const;

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    // Headline, phrased as the question a client or referrer would type.
    title: z.string(),
    // The 40–60 word answer-first lede — the citable unit for LLMs.
    answerFirst: z.string(),
    // One-line list summary (the "dek" in the feed).
    dek: z.string().optional(),
    pillar: z.enum(PILLARS),
    tags: z.array(z.string()).default([]),
    date: z.coerce.date(),
    readTime: z.string().default('5 min read'),
    hero: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Archived legal authorities. Each entry pairs a locally hosted copy of an
// official opinion or statute with Jay's own headnote, so article citations
// resolve to jaymcdaniel.com rather than to a third-party site that may move,
// paywall, or disappear.
const authorities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/authorities' }),
  schema: z.object({
    title: z.string(),
    // Official reporter first, regional parallel second.
    citation: z.string(),
    // What kind of authority this is. Drives the noun the page uses for it
    // ("the opinion", "the statute") and the label on the issuing body.
    authorityType: z.enum(['case', 'statute', 'rule', 'ruling']).default('case'),
    court: z.string().optional(),
    decided: z.coerce.date().optional(),
    docket: z.string().optional(),
    jurisdiction: z.enum(['NJ', 'NY', 'DE', 'Federal', 'Other']).default('NJ'),
    precedential: z.boolean().default(true),
    // One or two sentences stating what the case decides. The citable unit.
    holding: z.string().optional(),
    topics: z.array(z.string()).default([]),

    // Signoff gate — pages stay out of the build until Jay approves the headnote.
    headnoteApproved: z.boolean().default(false),

    // Provenance.
    archived: z.boolean().default(false),
    format: z.enum(['pdf', 'text']).optional(),
    localCopy: z.string().optional(),
    sourceUrl: z.string().optional(),
    sourceName: z.string().optional(),
    retrieved: z.coerce.date().optional(),
    sha1: z.string().optional(),
  }),
});

export const collections = { posts, authorities };
