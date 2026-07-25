import rss from '@astrojs/rss';
import { allPosts } from '../lib/posts';
import { SITE } from '../lib/site';

export async function GET(context) {
  const posts = await allPosts();
  return rss({
    title: `${SITE.name} — ${SITE.newsletter}`,
    description: 'Answer-first writing on valuation, business divorce, and exit for closely held companies.',
    site: context.site,
    items: posts.map((p) => ({
      title: p.data.title.replace(/<[^>]+>/g, ''),
      description: p.data.answerFirst.replace(/<[^>]+>/g, ''),
      pubDate: p.data.date,
      link: `/${p.id}/`,
      categories: [p.data.pillar, ...p.data.tags],
    })),
  });
}
