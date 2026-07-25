# jaymcdaniel.com

The content-first authority hub specified in the build brief, built as a static
site with [Astro](https://astro.build). It renders Appendix A pixel-faithfully,
carries the schema.org / answer-first requirements from Section 8, and deploys to
Cloudflare Pages with automatic SSL and no server to maintain.

---

## Running it locally

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build into dist/
```

Node 18+ required (built and tested on Node 22).

---

## Publishing a journal entry

One file per post. That is the whole workflow.

1. Copy `templates/post-template.md` into `src/content/posts/`.
2. Rename it to the URL slug you want — the filename becomes the URL.
   `src/content/posts/key-man-discounts.md` → `jaymcdaniel.com/key-man-discounts/`
3. Fill the front-matter fields (headline as a question, the 40–60 word
   answer-first lede, pillar, tags, date). Write the body in Markdown.
4. Commit and push. Cloudflare rebuilds and redeploys in seconds.

`draft: true` keeps a post out of the live build while you work on it. The
answer-first lede renders automatically as the highlighted opening paragraph —
don't repeat it in the body.

Claude can do all of this for you: hand it a topic and it writes the file,
sets the front-matter, and commits it.

---

## Where the identity lives

All of Jay's identity — name, credentials, tagline, phone, firm, newsletter
name, and the `sameAs` profile links used by the Person schema — is in one file:

```
src/lib/site.ts
```

Change it there once and it updates across every page. The three pillars and
their landing-page headnotes are in the same file.

---

## The five Section 9 decisions, and where they're set

| Decision | Current setting | Change it in |
|---|---|---|
| Newsletter name | "The Valuation Letter" | `src/lib/site.ts` → `newsletter` |
| Pillar labels | Valuation / Business Divorce / Exit & Succession | `src/lib/site.ts` → `PILLARS` |
| Post URL pattern | Flat `/[slug]/` | (chosen; see note below) |
| Business-divorce domain | Full 301 fold-in assumed | `public/_redirects` + old-domain DNS |
| Headshot | JM monogram placeholder | replace `.avatar` blocks / add image |

The flat `/[slug]/` pattern is wired in `src/pages/[slug].astro`. If you'd rather
use `/pillar/[slug]/`, that's a one-file change — but pick permanently before the
first post is public, because changing it later breaks inbound links.

---

## Wiring the newsletter

The site is intentionally decoupled from any email vendor. Three subscribe forms
(sidebar, end-of-article, and the `/subscribe/` page) currently `POST` to `#`.
Point them at your provider's form endpoint:

- **Kit (ConvertKit)**, **MailerLite**, **Buttondown**, or **Beehiiv** all give
  you a form `action` URL or an embed snippet.
- Search the project for `action="#"` and replace with your endpoint, or paste
  the provider's embed into `src/components/Sidebar.astro` and the two page forms.

Most of these are free to ~1,000 subscribers, so email capture can go live at no
cost and stay free well into the list's growth.

---

## Deploying to Cloudflare Pages

1. Push this folder to a Git repo (GitHub, GitLab, or Bitbucket).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**,
   and select the repo.
3. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy. Cloudflare builds it and serves it on a `*.pages.dev` URL.
5. **Custom domains → Set up a domain → `jaymcdaniel.com`.** If the domain's DNS
   is on Cloudflare, this is automatic; if not, add the CNAME they show you.
   The TLS certificate is provisioned and renewed automatically — nothing to manage.

Netlify is equivalent if you prefer it: same build command, same output directory,
same automatic SSL.

---

## Migration / redirects (build brief, Section 10)

`public/_redirects` handles path-level 301s once you've inventoried the old URLs.
The domain-level redirects for thebusinessdivorcelawyer.com and valuationcounsel.law
are set on those domains' own DNS/hosting, pointed at this hub. Map each old URL to
its nearest new equivalent before flipping the redirects, then submit the sitemap
(`/sitemap-index.xml`) and watch for 404s.

---

## What's included

- Home (featured answer-first + filterable feed), full Articles archive
- Three pillar landing pages with headnotes
- Tag archives at `/topic/[tag]/`
- Article template with answer-first lede, tags, end-subscribe, author card, related
- About (entity page), Work-with-me (single hard CTA), Subscribe
- Person + LegalService + Article + FAQPage schema.org markup
- Sitemap, RSS feed, robots.txt, 404
- Full design system from Appendix A in `src/styles/global.css`
