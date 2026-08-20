import { getCollection, type CollectionEntry } from 'astro:content';
import { tagSlug, TAG_INDEX_MIN } from './site';

export type Post = CollectionEntry<'posts'>;

// A tag, its URL slug, how many posts carry it, and whether it has crossed the
// TAG_INDEX_MIN threshold that earns it a dedicated /topic/[tag]/ page.
export interface TagInfo {
  label: string;
  slug: string;
  count: number;
  promoted: boolean;
}

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

// Every tag used across published posts, with counts. Most-used first, then A–Z.
// The first spelling seen for a slug wins as the display label.
export async function allTags(): Promise<TagInfo[]> {
  const posts = await allPosts();
  const map = new Map<string, TagInfo>();
  for (const p of posts) {
    for (const t of p.data.tags) {
      const slug = tagSlug(t);
      const cur = map.get(slug);
      if (cur) cur.count += 1;
      else map.set(slug, { label: t, slug, count: 1, promoted: false });
    }
  }
  const list = Array.from(map.values());
  for (const t of list) t.promoted = t.count >= TAG_INDEX_MIN;
  return list.sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
}

// Slugs of tags that have their own archive page (count >= TAG_INDEX_MIN). Used
// to decide whether a tag renders as a link or a plain label.
export async function promotedTagSlugs(): Promise<Set<string>> {
  return new Set((await allTags()).filter((t) => t.promoted).map((t) => t.slug));
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

