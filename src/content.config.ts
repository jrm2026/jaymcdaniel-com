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

export const collections = { posts };
