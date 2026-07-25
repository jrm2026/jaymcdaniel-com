import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

const isProd = import.meta.env.PROD;

// All published posts, newest first. Drafts hidden in production builds.
export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !(isProd && data.draft));
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function postsByPillar(label: string): Promise<Post[]> {
  return (await allPosts()).filter((p) => p.data.pillar === label);
}

export async function postsByTag(tag: string): Promise<Post[]> {
  return (await allPosts()).filter((p) => p.data.tags.includes(tag));
}

// Topic counts for the sidebar "Browse by Topic" list.
export async function pillarCounts(): Promise<Record<string, number>> {
  const posts = await allPosts();
  const counts: Record<string, number> = {};
  for (const p of posts) counts[p.data.pillar] = (counts[p.data.pillar] ?? 0) + 1;
  return counts;
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Filter token used by the home-page chip filter (pillar + tags, space-joined).
export function filterTokens(post: Post, pillarFilter: (label: string) => string | undefined): string {
  const tokens = new Set<string>();
  const pf = pillarFilter(post.data.pillar);
  if (pf) tokens.add(pf);
  for (const t of post.data.tags) {
    tokens.add(t.toLowerCase().split(/\s|&/)[0]);
  }
  return Array.from(tokens).join(' ');
}
