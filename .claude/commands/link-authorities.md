---
description: Link every case/statute citation in a post to its authority page, and report authorities that still need a page.
---

Wire the in-text citations in a blog post to their authority pages, following the
convention documented in `.claude/skills/archive-authority/SKILL.md` ("Linking
from articles").

## Target

`$ARGUMENTS`

- If a post path (or slug) is given, operate on that post only.
- If empty, operate on every published post in `src/content/posts/` (those with
  `draft: false`).

## Steps

1. **Build the authority index.** Read every file in `src/content/authorities/`
   and record, for each: the `slug` (its filename without `.md`), `title`,
   `citation`, and `headnoteApproved`. Only entries with `headnoteApproved: true`
   are link targets — an unapproved page is not live and must not be linked.

2. **Find the citations.** In the target post, identify every citation to a case,
   statute, or ruling — e.g. italicized case names (`*Cavalier Oil Corp. v.
   Harnett*`), reporter cites, `N.J.S.A. …`, `8 Del. C. § …`, `Business
   Corporation Law § …`, `Revenue Ruling …`.

3. **Match each citation to an authority page.** Match on the case name or
   statutory designation against the authority `title`/`citation`/`slug`. Match
   conservatively — if you are not confident a citation maps to a specific
   authority page, treat it as unmatched and report it rather than guessing.

4. **Insert the links.** For each matched citation, wrap the citation text in a
   markdown link to `/authorities/<slug>/`:
   - Cases: link the italicized case name, e.g.
     `[*Cavalier Oil Corp. v. Harnett*](/authorities/cavalier-oil-v-harnett-564-a2d-1137/)`.
   - Statutes/rulings: link the designation, e.g.
     `[N.J.S.A. 14A:12-7(8)](/authorities/njsa-14a-12-7/)`.
   - Link the **first occurrence in the body** and the **first occurrence inside
     the FAQ block** (the `## Frequently asked questions` section) if the
     authority is cited there. Skip later repetitions.
   - **Never** alter the citation text, the reporter numbers, or any surrounding
     prose. Only wrap the existing citation in `[...](...)`. If a citation is
     already linked, leave it.

5. **Build and verify.** Run `npm run build`. Confirm the post is in `dist/` and
   that every `/authorities/<slug>/` link in the post resolves to a built
   `dist/authorities/<slug>/index.html`. Report any broken link.

6. **Report.** Print three lists:
   - **Linked** — citation → authority slug, for each link inserted.
   - **Needs a page** — citations with no matching (approved) authority page.
     These are the headnotes to draft next; point to the `archive-authority`
     skill to create them, then re-run this command.
   - **Already linked / skipped** — citations left untouched, with why.

Do not commit or push unless asked — leave the working tree for review.
