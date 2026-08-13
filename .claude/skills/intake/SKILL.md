---
name: intake
description: Use when Jay wants to turn his Fieldy conversation recordings into work product — time entries, memos to the file, follow-up notes, and to-dos — and file them into Notion. Triggers on "process my conversations", "intake yesterday/today/this week", "catch me up on my recordings", "log my time from the calls", "what do I need to do from my meetings", "file that call", or any request to move recorded real-world conversations into the practice's Notion. Reads Fieldy, discards everything personal, matches people against a persistent roster, and auto-files unreviewed drafts to Notion for Jay to edit.
---

# Fieldy → Notion intake

Jay wears a Fieldy recorder. It captures his whole day — client calls, opposing
counsel, closings, co-counsel strategy — and, mixed in with all of it, personal
calls, health information, driving, and errands. This skill turns the **billable
legal** parts into filed work product and throws the rest away.

The output is drafts, not final work. Everything filed is marked **Unreviewed**;
Jay edits in Notion. The job here is to get the substance out of the transcript
and into the right place accurately, not to bill or send anything.

## Three rules that are not negotiable

**1. Discard everything that is not billable legal work — completely.** Personal
calls, family, health and medical detail, gym, errands, driving and navigation,
social chatter: detect it, skip it, and store *nothing* from it. Do not summarize
it, do not note what it was about, do not copy a line of it into Notion or into
any file in this repo. The only permissible trace is a bare count in the run
report ("3 non-legal segments discarded"). Jay chose *discard entirely* — honor
it. When a segment is ambiguous, err toward discarding; a missed time entry costs
less than a personal detail landing in a firm system.

**2. This is privileged, confidential material.** The recordings contain clients,
opposing counsel, and third parties who did not consent to being recorded. Treat
every transcript as attorney work product and client confidence. Never send
conversation content to any external service other than Jay's own Notion. Never
write conversation content into the website content directories
(`src/content/`), into a commit, or anywhere public. This skill reads Fieldy and
writes Notion — nothing else leaves the session.

**3. Never assert an identity or a fact you cannot support from the transcript.**
Speaker labels are worthless across recordings (see below). A wrong name on a
memo-to-file is worse than an honest "(unconfirmed)". Flag what you inferred.

## Before the first run: provision Notion

The target databases may not exist yet. **Read `notion-setup.md` in this skill's
directory** — it holds the exact schema (databases, properties, types, creation
order) and is the source of truth. Do not invent property names from memory.

On any run, resolve the targets first:

1. Read `.claude/skills/intake/notion-targets.json` if it exists — it caches the
   five database IDs from a prior setup.
2. If it is missing or a target 404s, find the databases by title with Notion
   search; create any that are absent per `notion-setup.md`; then write the
   resolved IDs back to `notion-targets.json` so later runs skip discovery.

`notion-targets.json` holds only database IDs — no client data — and is safe to
keep in the repo. Never put conversation content in it.

## The workflow

### 1. Scope the run

- No date given → `fieldy_list_recent_conversations`.
- A day, week, or month named → `fieldy_list_conversations_in_time_range` (ISO
  8601 with offset; window ≤ 30 days).
- Page with `nextCursor` until `hasMore` is false. Skip items titled "No speech
  detected" and sub-30-second fragments — they carry nothing.

### 2. Pull each transcript

`fieldy_get_conversation` returns the full record with the transcript embedded.
If `transcriptTruncated` is true, extend with `fieldy_list_transcripts` over the
same window. Long calls (a 40-minute conference, a multi-hour day-capture) can
exceed the tool-result limit and get spilled to a file; when that happens,
**hand the file to a subagent** to extract the structured output rather than
loading the raw transcript into the main context — it keeps privileged bulk out
of the working transcript and is faster. Give the subagent the section spec from
step 5 verbatim.

### 3. Segment

A single recording is rarely a single conversation. Split it into distinct
exchanges on three signals: a change in who is speaking, a topic shift, and a
gap in timestamps. A day-capture can hold nine or ten segments — separate calls,
an in-person closing, driving between them. Segment before you classify; a
personal aside inside an otherwise-billable call gets dropped, and a legal call
buried in an afternoon of errands gets kept.

### 4. Classify each segment, then discard the non-legal ones

For every segment decide: **billable legal work**, or **not**. Billable = client
communication, opposing-counsel negotiation, co-counsel strategy, a closing,
substantive analysis of a matter. Not billable = anything in Rule 1. Discard the
non-legal segments now, before any drafting, per Rule 1. Carry only the legal
segments forward.

### 5. Extract from each legal segment

Produce these, concretely, citing real names, numbers, and facts:

1. **Matter & people** — which matter/client; every person named and their role.
2. **Speaker attribution** — map the segment's Speaker-N labels to real people
   (see roster rules below). Note which speaker is Jay. Flag uncertainty.
3. **Memo to the file** — a `RE:` / `Date` / `Attendees` header, then a tight
   file-memo in Jay's voice: substance, positions, decisions, next step. Partner
   memo voice — declarative, no throat-clearing, no summary paragraph.
4. **Time entry** — Date, Matter, billing-style narrative, and Hours in **tenths
   of an hour** based on *actual billable talk time*, not the recording's
   wall-clock. One entry per matter per segment. Exclude anything discarded.
5. **To-dos** — each with an owner where the transcript makes it clear, and a due
   date if one was stated.
6. **Follow-ups / open threads** — the questions left hanging.

### 6. Match the matter and the people

- **Matter:** search the Matters DB for the client, adverse party, or distinctive
  facts. Reuse the existing matter if found. Only create a new Matter when the
  segment plainly concerns one not already on file, and say so in the report.
- **People:** for each person, reconcile against the People roster (below) and
  update it.

### 7. De-duplicate, then file

Every filed item carries its **source** — the Fieldy conversation id plus the
segment's start time. Before writing, query each target for that source and skip
anything already filed; re-running a day must not double-file it. Then create the
records with **Status = Unreviewed**:

- Time entry → Time Entries DB
- Memo → Memos DB (header as properties, memo text as the page body)
- Each to-do → To-dos DB
- Follow-ups → carry into the memo body; promote to To-dos only if actionable

## Roster rules — why speaker numbers are useless

Fieldy numbers speakers per recording, and the numbers reset between recordings
and even between segments of one recording. Jay has been Speaker 1, Speaker 2,
and Speaker 3 on three consecutive calls. There is no voiceprint available to
this skill — cross-conversation voice recognition is a device feature Fieldy does
not expose through the API. So identity comes only from the transcript:

- **Self-identification** — "It's Jay here," "Hey, Bill. Jay." — the strongest cue.
- **Direct address** — someone called "Paul," answered by a consistent speaker.
- **Context** — role, matter, facts only one participant would state.

Resolve each speaker to a person in the roster. Record transcription variants as
aliases (Fieldy rendered one opposing counsel as both "Brandon" and "Brett" —
same person, one roster entry, both aliases). When you cannot support an
identity, write it as "(unconfirmed)" on the memo and in the report; never
guess a name onto a file memo. The roster is the persistent memory that makes
"the same person, next time" work — keep it clean and keep it current.

## Time-entry conventions

- Tenths of an hour. A five-minute strategy call is 0.1–0.2; a 40-minute
  conference is ~0.7; a day of scattered calls totals from the billable talk
  time, not the hours the recorder was on.
- Narrative in the firm's billing voice: what was done, on what, toward what end.
- Everything is **Unreviewed** and the hours are a starting point. The billing
  judgment — whether to bill it, at what time — is Jay's, always.

## Finishing a run — report

- Matters touched, and any Matter or roster entry newly created.
- Every record filed, as a Notion link, grouped by matter.
- Count of non-legal segments discarded — the number only, never the content.
- Every uncertain call, named individually: an unconfirmed speaker, a matter
  match you were not sure of, a person who might be new versus an alias of
  someone on the roster.

Do not commit or push. Do not touch the website build. Leave Notion as the
review surface.
