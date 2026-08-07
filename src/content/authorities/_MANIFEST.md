# Authority archive — batch 1

Six pages, frontmatter complete, headnotes drafted for your edit.
Place in `src/content/authorities/`.

## Archiving status

Every page is `archived: false`. I could not download the files from this session:
the sandbox blocks outbound traffic to njcourts.gov, law.justia.com, and
courtlistener.com, and njcourts.gov additionally returned bot detection on two
attempts. Each page records the `sourceUrl` the agent should pull from, so an
agent run with normal network access can complete the download step and flip the
flag. Per the skill's failure rule, nothing claims a local copy that does not exist.

| Slug | Source to pull | Expected format | Note |
|---|---|---|---|
| balsamides-v-protameen-160-nj-352 | Justia (NJ Supreme Court slip opinion) | pdf or text | Justia serves HTML; capture text if no PDF |
| lawson-mardon-wheaton-v-smith-160-nj-383 | CourtListener | check `download_url` first | verify it is not a reporter scan |
| cavalier-oil-v-harnett-564-a2d-1137 | Justia | text | 1989, pre-digital; likely no court PDF |
| friedman-v-beway-realty-87-ny2d-161 | Justia | text | also check nycourts.gov reporter archive |
| namerow-v-pediatricare-461-nj-super-133 | njcourts.gov `/attorneys/assets/opinions/trial/c000273-17.pdf` | pdf | **verify which opinion** — see below |
| dugan-v-dugan-92-nj-423 | CourtListener | text | 1983; no court PDF expected |

## Flagged for your eye

**Namerow.** The court's unpublished trial list shows two entries in this case,
January 23, 2018 and November 30, 2018. The published decision at 461 N.J. Super.
133 is the November 30 partial summary judgment. The docket-numbered PDF may be
either. Confirm before the page goes live.

**Cavalier Oil and Dugan.** Pre-digital. No court-issued PDF will exist, and the
only page images are Harvard CAP scans of the Atlantic Reporter, which carry West
headnotes. Both are set `format: text` under the hard rule. Archive the opinion
text, not the scan.

**Docket numbers.** Blank on Cavalier Oil, Friedman, and Dugan — not verified, and
I did not want to guess. Fill or leave empty.

## Once archived

Update the article citations to point at the authority pages rather than external
sources, e.g.

    ([opinion here](/authorities/balsamides-v-protameen-160-nj-352/))
