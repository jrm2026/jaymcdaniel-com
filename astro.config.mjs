import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';

// The canonical production domain. Change here if the domain ever moves.
export default defineConfig({
  site: 'https://jaymcdaniel.com',
  trailingSlash: 'always',
  // pagefind() indexes the built HTML at astro:build:done and writes the search
  // index to dist/pagefind/. Only pages that carry `data-pagefind-body` are
  // indexed — currently the authorities archive — so search is scoped to it.
  integrations: [sitemap(), pagefind()],
  build: {
    // Emit clean directory URLs: /some-post/index.html -> /some-post/
    format: 'directory',
  },
});
