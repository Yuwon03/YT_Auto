# idea_fetch_online Workflow

Goal: Build source-backed, trend-aware idea seeds through AI+user collaboration.

Read contract: `../ytauto-common/output-contract.md`

## Steps

1. Ask user keyword mode:
   - `AI-suggest`
   - `User-provided`
   - `Mixed`
2. If `AI-suggest` or `Mixed`, propose 5 trend keywords for the target domain.
3. Let user select 1-3 keywords (or replace directly).
4. Ask preferred source set (news/reddit/kyobo/papers/manual links).
5. Collect references and summarize:
   - signal
   - source
   - why it matters now
6. Generate 5-10 content angles:
   - hook
   - audience emotion
   - risk/copyright notes
7. Ask user to keep/edit/drop each angle.
8. Save outputs.

## Output Files

- `./online_idea/{timestamp}.md`
- `./online_idea/{timestamp}.json`

`{timestamp}` format: `YYYYMMDD-HHMMSS`

## Markdown Output Template

```md
# Online Idea Fetch

## User Context
- mode:
- selected_keywords:
- target_audience:

## Sources
- [type] title | link | reason

## Trend Signals
- signal:

## Candidate Angles
1. title:
   - hook:
   - why-now:
   - caution:

## User Decisions
- keep:
- revise:
- reject:
```

## JSON Output Keys

- `created_at`
- `selected_keywords`
- `sources[]`
- `signals[]`
- `angles[]`
- `user_decisions`
