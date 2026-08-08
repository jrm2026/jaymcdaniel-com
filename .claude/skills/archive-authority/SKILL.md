---
name: archive-authority
description: Use when Jay asks to archive a case, statute, or ruling cited in an article; to build or repair the /authorities/ archive on jaymcdaniel.com; to replace external citation links with internal ones; or to check the archive for missing or broken authorities. Downloads the official copy of an opinion, stores it in the repo, records provenance, and generates the authority page.
---

# Archiving legal authorities to jaymcdaniel.com

## Purpose

Every case or statute cited in an article should resolve to an **authority page**
on jaymcdaniel.com — Jay's headnote on what it holds and why it matters to a
closely held owner — rather than to a third-party site that may reorganize,
paywall, or disappear. This skill defines how to write that page, how to link an
article's citations to it, and how — optionally — to store an official copy of
the underlying document.

**Note-first.** The headnote is the deliverable and is required for every
authority. It is the original, indexable content that builds the site's
authority; the underlying PDF is a commodity available on a dozen sites. Hosting
a local copy is *optional*: do it for the few tentpole authorities worth insuring
against link rot, and otherwise let the page fall back to a link to a free public
source. Do not expend effort chasing a downloadable copy for every citation — an
approved headnote with a working public-source link is a complete, publishable
page. Never create a hosted copy without a headnote wrapped around it.

## Hard rules

These override the resolution order below. No fallback justifies breaking them.

**Do not archive a scanned commercial reporter page without asking.** Harvard CAP
scans, and any image of a West, Lexis, or other publisher's volume, carry that
publisher's headnotes and syllabi on the same page. Default to archiving the plain
text of the opinion instead and mark `format: text`. If a page image is the only
thing available and the text is not, stop and raise it with Jay rather than
deciding whether the copy is safe to host.

**Never archive a database's editorial layer.** No headnotes, no syllabi prepared
by a publisher, no AI-generated case summaries. A court-prepared syllabus is fine
and should be labeled as such.

**Never fabricate a source.** If no official copy can be obtained, leave the
external link in place, set `archived: false` on the authority page, and report
the failure. An entry that claims a local copy which does not exist is worse than
an external link.

**Never publish a headnote Jay has not approved.** Generated headnotes are drafts.
Write them, present them for signoff, and leave the page unpublished until Jay
approves the text. He may edit, rewrite, or reject. Publishing under his name
without his sign-off is the one failure this workflow cannot tolerate, because
the headnote is the analysis a reader will attribute to him.

**Escalate every copyright, fair use, or source-legitimacy question to Jay.**
Do not resolve them independently, do not rely on a rule of thumb, and do not
proceed on the assumption that a prior answer covers a new situation. Jay is the
lawyer. The agent's job is to surface the question with the facts he needs, not
to decide it. See "Questions that go to Jay" below.

**Verify before archiving.** Confirm the document is the opinion cited, not a
different order in the same docket. Cases frequently produce several written
decisions; match the date and the disposition, not just the docket number.

## Resolution order

Work down the list. Stop at the first source that yields a downloadable official
copy meeting the hard rules.

1. **CourtListener.** Query the opinions endpoint and read `download_url` first —
   this is the URL CourtListener originally harvested, and for modern cases it is
   normally the court's own PDF. Fetch that. If `download_url` is empty or dead,
   use `local_path` for CourtListener's stored copy, but check whether that copy
   is a reporter scan before saving it.
2. **Justia.** Usually HTML rather than PDF. Acceptable as a text source; capture
   the opinion text and mark `format: text`. Strip Justia's own summary and any
   AI-generated metadata blocks.
3. **The jurisdiction's official site.** New Jersey files trial opinions by docket
   number under Unpublished Trial Court Opinions and appellate opinions by A-number.
   Delaware posts to courts.delaware.gov; New York to nycourts.gov. Expect bot
   detection on njcourts.gov — if a fetch is blocked, do not retry in a loop.
   Record the URL, set `archived: false`, and flag it for manual download.
4. **Other official postings.** Government or court-affiliated sites, law school
   repositories, state bar publications. Confirm the posting is complete and
   unedited before treating it as official.

For statutes and administrative guidance, go straight to the government source:
the state legislature or code site, delcode.delaware.gov, nysenate.gov, irs.gov.
Federal and state statutory text is not copyrightable. Do not archive an
annotated code — the annotations are the publisher's.

## Where files go

```
public/authorities/<slug>.pdf          # or .txt for text-only captures
src/content/authorities/<slug>.md      # the authority page
```

Slug format is case name plus official citation, lowercased and hyphenated,
volume and reporter abbreviated without periods:

```
balsamides-v-protameen-160-nj-352
cavalier-oil-v-harnett-564-a2d-1137
namerow-v-pediatricare-461-nj-super-133
njsa-14a-12-7
```

The slug is permanent. It is the URL and it is what every article links to.
Changing it breaks every citation across the site.

## Authority page frontmatter

```yaml
---
title: "Balsamides v. Protameen Chemicals, Inc."
slug: balsamides-v-protameen-160-nj-352
citation: "160 N.J. 352, 734 A.2d 721 (1999)"
court: "Supreme Court of New Jersey"
decided: 1999-07-14
docket: "A-27-1998"
jurisdiction: "NJ"
precedential: true
holding: "A marketability discount cannot be used unfairly by controlling or
  oppressing shareholders to benefit themselves at the expense of the minority.
  Where the oppressor is the seller and the oppressed shareholder is the buyer,
  the discount applies."
topics: ["Fair Value Standard", "Discounts & Premiums", "Oppression"]
archived: true
format: pdf              # pdf | text
localCopy: /authorities/balsamides-v-protameen-160-nj-352.pdf
sourceUrl: "https://law.justia.com/cases/new-jersey/supreme-court/1999/a-27-98-opn.html"
sourceName: "Justia"
retrieved: 2026-08-07
sha1: "<hash of the stored file>"
---
```

`sourceUrl`, `retrieved`, and `sha1` are the provenance record. They let Jay
establish later what he archived, from where, and on what date, and let a
verification pass detect whether a stored file has been altered. Do not omit them.

The page body is Jay's headnote: what the case decides, what it means for an
owner or a referring attorney, and where it sits against related authority.
Two to four paragraphs in his voice. This is the original content that makes the
page worth indexing — a page containing only a citation and a PDF link is thin
content and should not be published.

## Linking from articles

Every authority cited in the body of an article should link to its authority page
as soon as that page exists and its headnote is approved — the archived/`archived:
false` state does not matter, because the page itself carries whichever path is
available (a hosted copy, or a link to a free public source). The in-text link's
only job is to get the reader to the authority page; the page offers the reader
the two ways onward.

The convention is to **link the citation text itself** to the authority page —
the italicized case name for a case, the statutory designation for a statute or
ruling — without altering the citation string:

```markdown
Delaware settled the unit of valuation in
[*Cavalier Oil Corp. v. Harnett*](/authorities/cavalier-oil-v-harnett-564-a2d-1137/),
564 A.2d 1137 (Del. 1989).

... the court-ordered buyout under
[N.J.S.A. 14A:12-7(8)](/authorities/njsa-14a-12-7/) ...
```

This keeps the reporter citation pristine (it is the string a reader or an answer
engine will match on) while making the reference clickable. The link target is
always our own `/authorities/<slug>/` page — never a database and never a bare
PDF — so the reference stays source-agnostic and the provenance and public-source
link live on one page we control.

Link the **first occurrence in the body**, and the **first occurrence inside the
FAQ block** if the authority is cited there, since an FAQ answer is a standalone
unit an answer engine may extract on its own. Do not link every repetition; that
is noise.

If a cited authority has **no authority page yet**, do not invent a link. Create
the page first (write the headnote, get Jay's sign-off, optionally archive a
copy), then link. Report every citation left unlinked for want of a page.

### Running the pass: the `/link-authorities` command

`.claude/commands/link-authorities.md` automates this for a post. Invoke it as
`/link-authorities <path-to-post.md>` (or with no argument to sweep every
published post). It matches each citation to an existing authority page, inserts
the links per the convention above, and reports any citation whose authority page
does not exist yet so you know which headnotes to draft next. It only ever wraps a
citation in a link — it never rewrites Jay's prose.

## Questions that go to Jay

Stop and ask rather than resolving any of the following. Present the facts — what
the document is, where it came from, what it contains, what the terms of the
hosting site say — and let him decide.

- A source's terms of use appear to restrict copying, redistribution, or automated
  access, including where the underlying document is uncopyrightable.
- The only available copy carries publisher material: headnotes, syllabi, editorial
  summaries, annotations, or a reporter's page images.
- The document is not a court opinion or a statute — a brief, a transcript, an
  expert report, a treatise excerpt, a bar journal article, a CLE handout. The
  government edicts reasoning that covers opinions does not extend to these.
- Any document from a matter Jay was involved in, or that names a current or former
  client, whether or not it is a public filing.
- A sealed, redacted, or withdrawn document, or one whose posting appears
  unauthorized.
- Anything under a paywall, login, or subscription, however obtained.
- Non-U.S. material, where the public domain analysis differs.
- Any situation where the honest answer is that it is probably fine. Probably is
  the signal to ask.

Raise these individually and by name. Do not batch them into a summary line at the
end of a run, and do not proceed with the rest of the batch on the assumption that
a pending question will come back yes.

## Headnote signoff

The workflow is: archive the document, draft the headnote, present it, wait.

Present drafts as a batch with the slug, citation, proposed `holding` line, and the
full body text, so Jay can read and mark them in one pass. Note anything you were
uncertain about — a pinpoint you could not verify, a characterization of the
holding you are not confident in, a date or docket left blank.

Pages stay unpublished until he approves. On approval, publish as approved; do not
re-edit an approved headnote for style, length, or consistency with other pages.
If a later correction is needed, propose it and wait again.

## Failure and reporting

At the end of a run, report:

- authorities archived, with slug and source
- authorities that fell through every step, with the last URL tried and the reason
- any file rejected under the hard rules, and which rule
- any citation whose reporter or date could not be verified
- headnotes drafted and awaiting signoff
- questions raised for Jay and still open, with what is blocked behind each

Never silently skip. An unarchived authority is a known gap; an unreported one is
a defect.

## Scope discipline

Archive authorities Jay actually cites. Do not bulk-import a reporter volume or
every case in a topic. Thirty well-annotated authority pages outperform three
hundred bare PDFs, and the maintenance obligation of the second is real.

## Verification pass

Run periodically:

- confirm every `localCopy` file exists and its sha1 matches
- confirm every `sourceUrl` still resolves; if not, the local copy is now the
  only copy and the page should say so
- confirm every case citation in every article resolves to an authority page or
  to a deliberate external link
- re-check `archived: false` entries to see whether a source has become available
