import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The canonical production domain. Change here if the domain ever moves.
export default defineConfig({
  site: 'https://jaymcdaniel.com',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // Emit clean directory URLs: /some-post/index.html -> /some-post/
    format: 'directory',
  },
});
