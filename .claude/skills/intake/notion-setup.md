# Notion setup — the intake target schema

This is the source of truth for the five databases the `intake` skill writes to.
Provision them once; after that Notion is authoritative and this file documents
what was built. Do not change property names here without changing them in Notion.

## Creation order

Relations require the related database to exist first. Create in this order:

1. **Matters**
2. **People**
3. **Time Entries**, **Memos**, **To-dos** (each relates back to Matters/People)

Put all five under one parent page (e.g. a Notion page titled "Practice Intake")
so they live together. After creating them, write the resolved database IDs to
`.claude/skills/intake/notion-targets.json` in this shape:

```json
{
  "matters": "<database_id>",
  "people": "<database_id>",
  "timeEntries": "<database_id>",
  "memos": "<database_id>",
  "todos": "<database_id>"
}
```

Later runs read that file and skip discovery. It holds IDs only — never
conversation content.

## Matters

The spine. One row per client matter.

| Property | Type | Notes |
|---|---|---|
| Name | Title | Short matter name, e.g. "Matt adv. Alex — Business Divorce" |
| Client | Rich text | Who Jay represents |
| Adverse party | Rich text | Opposing party, if any |
| Practice area | Select | Business divorce · Legal malpractice · Estate · Transactional · Other |
| Status | Select | Active · Prospective · Closed |
| Notes | Rich text | Free context |

## People

The persistent speaker roster. One row per human, reused across every future
recording. This is what defeats Fieldy's per-recording speaker numbering.

| Property | Type | Notes |
|---|---|---|
| Name | Title | Best known name |
| Role | Select | Our client · Co-counsel · Opposing counsel · Opposing party · Neutral/SFA/Expert · Court · Third party |
| Matter | Relation → Matters | May relate to more than one |
| Aliases | Rich text | Transcription variants, e.g. "Brandon / Brett" |
| Identifying cues | Rich text | How they self-identify or are addressed — NOT a voiceprint (none available) |
| Notes | Rich text | Role detail worth remembering |

## Time Entries

| Property | Type | Notes |
|---|---|---|
| Narrative | Title | Billing-style description of the work |
| Date | Date | Date of the work |
| Matter | Relation → Matters | Required |
| Hours | Number | Tenths of an hour |
| Billable | Checkbox | Default checked; Jay decides finally |
| Status | Select | Unreviewed · Reviewed · Billed — new rows are **Unreviewed** |
| Source | Rich text | Fieldy conversation id + segment start time (de-dup key) |

## Memos

The memo text is the **page body**, not a property — so it renders as a document.

| Property | Type | Notes |
|---|---|---|
| Title | Title | "RE:" line of the memo |
| Date | Date | |
| Matter | Relation → Matters | Required |
| Attendees | Relation → People | Everyone present |
| Status | Select | Unreviewed · Reviewed — new rows are **Unreviewed** |
| Source | Rich text | Fieldy conversation id (de-dup key) |

## To-dos

| Property | Type | Notes |
|---|---|---|
| Task | Title | The action |
| Owner | Rich text | Who owns it, where the transcript makes it clear |
| Due | Date | If a date was stated |
| Matter | Relation → Matters | |
| Status | Select | To do · Doing · Done — new rows are **To do** |
| Source | Rich text | Fieldy conversation id + segment start time (de-dup key) |

## De-duplication

`Source` is the idempotency key on Time Entries, Memos, and To-dos. Before
filing, query the target for the same `Source` and skip if present. Re-running an
already-processed day must not create duplicates.
