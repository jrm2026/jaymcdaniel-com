---
name: draft-post
description: Use when Jay asks to draft, write, or revise a post for jaymcdaniel.com — a teaser, a full article, or a rewrite of an existing one; when he names a topic, a case, or a doctrine and wants it turned into publishable copy; or when he asks whether a topic is already covered. Researches and verifies before drafting, writes to the repo's own front-matter schema, matches house voice and length class, and hands off to /link-authorities for citation wiring.
---

# Drafting a post for jaymcdaniel.com

## The one rule about front matter

**Read `templates/post-template.md` and `src/content.config.ts` before writing a
single field.** Do not write front matter from memory and do not look for the
field names in this skill — they are deliberately not here. The template is the
source of truth, it ships with the code, and it changes. A skill that restates
the schema starts drifting the day someone edits the template.

The template's inline comments carry rules the schema cannot express: how the
headline should be phrased, how long the answer-first lede runs, and the fact
that the lede renders automatically and **must not be repeated in the body**.
Read the comments, not just the keys.

When in doubt about a convention, read an existing post in
`src/content/posts/`. The most recent long-form post is the best structural
model.

## Research before drafting. Always.

The deliverable is legal analysis published under Jay's name. Getting a holding
wrong is a professional problem, not an editing problem.

Work in this order, and do not begin drafting until the first step is finished:

1. **Read the primary sources.** Use the CourtListener MCP to pull the actual
   opinions. Read the passages that matter rather than relying on a summary, a
   headnote, or a secondary article. Search results and law-firm blog posts
   routinely misstate holdings — treat them as pointers to the opinion, never as
   the authority itself.
2. **Verify every citation** — reporter, volume, page, court, year, and
   subsequent history. Confirm the case says what you are about to claim it says.
3. **Check the archive.** Read `src/content/posts/` to see whether the topic is
   already covered and which existing posts should be cross-referenced. Read
   `src/content/authorities/` to see which cited authorities already have pages.
4. **Then draft.**

State the holding precisely and separate it from dicta. Where the law is
genuinely unsettled, say so — hedged precision reads as more credible than false
confidence, and Jay will be asked about it by someone who knows.

**Flag what you could not verify.** A pinpoint you could not confirm, a
characterization you are not certain of, a subsequent history you did not check.
Report these at the end of the run rather than burying them in confident prose.
Never assert a case outcome you have not read.

## Length classes

The archive has two, and mixing them produces something that reads like neither.
Confirm which one is wanted before drafting; if the request is ambiguous, ask.

**Teaser.** Roughly 200–250 words of body. Four or five short paragraphs, no
subheads, no FAQ block, no citations in the body. It states a principle, names
the risk, and lands a conclusion. See `valuing-business-matrimonial-vs-buyout.md`.

**Full article.** Roughly 1,800–2,800 words. Subheads, inline authority links, an
FAQ block, related reading, and the closing CTA and bio. See
`how-the-strategic-buyer-or-hypothetical-buyer-sets-fair-value-in-a-buyout.md`.

Set `readTime` in proportion to what existing posts use for comparable length.
Do not invent a number that contradicts the archive.

## Structure of a full article

Follow the most recent long-form post rather than this list where they differ.

1. **Open on a concrete case.** A narrative hook — the facts of a real published
   decision, or an anonymized matter — carrying the reader into the principle.
   Not an abstract statement of the doctrine. Three or four short paragraphs,
   ending on the turn.
2. **Subheads that answer a question** a client or referring attorney would
   actually ask. No decorative headings, no one-word labels.
3. **Take the counterargument seriously.** The best posts in the archive include
   a section on the doctrine that cuts the other way, stated at its strongest
   before it is answered.
4. **A practical section** on where the analysis breaks in real cases — what a
   defensible report contains, where the other side's expert is vulnerable.
5. **`---`, then `## Frequently asked questions`.** Four to six. The question in
   bold, the answer immediately beneath with no blank line. Two to four sentences
   each, doctrinally accurate, no hedging beyond what the law requires. At least
   one FAQ addresses the economic consequence to the owner, not just the legal
   standard. An FAQ answer is a standalone unit an answer engine may extract on
   its own, so it must carry its own citation.
6. **`---`, then `## Related reading`** — a short list of existing post titles as
   plain text, not links.
7. **`---`, then the CTA and bio lines**, copied in form from the most recent
   long-form post.

## Citations and authority links

Link the citation text itself — the italicized case name for a case, the
statutory designation for a statute — to `/authorities/<slug>/`, keeping the
reporter citation outside the link so the citation string stays pristine:

```markdown
[*Dugan v. Dugan*](/authorities/dugan-v-dugan-92-nj-423/), 92 N.J. 423 (1983)
```

**Only link authorities whose page exists and whose `headnoteApproved` is
`true`.** An unapproved page is not live and must not be linked. Never invent a
link to a page that does not exist.

Link the first occurrence in the body and the first occurrence inside the FAQ
block. Skip later repetitions.

For every cited authority with no page yet, leave the citation unlinked and
**report it as a headnote to draft**. The `archive-authority` skill creates those
pages; `/link-authorities` wires them once approved. Do not create authority
pages as a side effect of drafting a post unless asked — they carry their own
signoff requirement.

## Voice

Partner-level memo. A senior advisor briefing a sophisticated professional before
a client call. Not a blog post, not a law school outline, not marketing.

Declarative sentences. Nouns and verbs carry the meaning. Short paragraphs, two
to four sentences, with one-sentence paragraphs for emphasis. Compress — if a
sentence can be cut without losing information, cut it.

Vary sentence length deliberately. A run of short declarative sentences followed
by a longer one carrying a qualification reads as human; uniform length is a tell.

**Do not:**

- open with throat-clearing ("In today's business environment," "It is well
  established that")
- restate the reader's problem back to them at length
- close with a summary paragraph restating what was just said
- lean on three-item lists as a rhythmic crutch
- use "it's not just X, it's Y" constructions
- pair em-dashes relentlessly
- hedge without resolving — land on a position
- use hype language, motivational framing, or emoji

Bullets exist for points of emphasis, not as the substance of the prose. If a
section is mostly bullets, it has not been written yet.

## Every substantive post must

- cite actual cases and statutes by full citation — never "courts have held"
- state the doctrinal posture precisely: fiduciary duty, contract, dissolution,
  freeze-out, equitable distribution. Do not blur these into generic "minority
  shareholder rights"
- carry a valuation dimension wherever the facts touch fair value, discounts, or
  buyout mechanics — this is the differentiator
- close by connecting the analysis to the adjacent practice areas where the same
  question recurs

Default to New Jersey framing and examples. New York is a deliberate growth
track. Multistate content stays valuation-led.

## Where the file goes

One file per post in `src/content/posts/`. The filename is the URL slug, and the
slug is permanent — changing it later breaks inbound links and any citation to
the post. Choose it as a search query a client would type.

**Set `draft: true`.** Every new post stays out of the production build until Jay
has read it. Publishing under his name without his sign-off is the one failure
this workflow cannot tolerate.

## Finishing a run

1. Run `npm run build` and confirm the post compiles. A front-matter field the
   schema does not recognize, or a missing required field, fails the build.
2. Run `/link-authorities <path-to-post>` to wire the citations that have pages.
3. Report:
   - the length class and final word count
   - every citation left unlinked for want of an authority page — this is the
     headnote queue, and the most useful thing in the report
   - anything you could not verify, named individually
   - any place you took a position on unsettled law, so Jay can check it

Do not commit or push unless asked. Leave the working tree for review.
