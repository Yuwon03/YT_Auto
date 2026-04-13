# story_edit Workflow

Goal: Apply directed story revisions while preserving narrative continuity.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## Required input

- Existing story file from `./story`
- User edit directives (tone, scope, constraints)

## Preflight checks

1. Parse directives into atomic change requests.
2. Classify each request:
   - mandatory
   - optional
   - conflict-risk
3. Confirm rewrite scope with user before editing.

## Execution steps

1. Apply mandatory edits.
2. Apply optional edits that do not break continuity.
3. Re-run consistency checks:
   - character logic
   - timeline
   - thematic alignment
4. Generate edit log with accepted/rejected items.
5. Save artifacts.

## Quality gate before save

- No unresolved contradictory statements across scenes.
- Rejected edits must include explicit reason.
- If scope exceeds safe rewrite boundary, mark `needs_review`.

## Output files

- `./story/{timestamp}-rev.md`
- `./story/{timestamp}-edit-log.md`

Timestamp format: `YYYYMMDD-HHMMSS`
