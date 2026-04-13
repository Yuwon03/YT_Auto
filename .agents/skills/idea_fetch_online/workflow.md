# idea_fetch_online Workflow

Goal: Build source-backed, trend-aware idea seeds with explicit user decisions.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## On activation

1. Confirm target domain and audience in one sentence each.
2. Ask mode:
   - `ai_suggest`
   - `user_keywords`
   - `mixed`
3. Require at least one verifiable source input path:
   - live links
   - source names with searchable identifiers
   - user provided summaries marked as `manual_input`

## Execution steps

1. Collect or generate keyword candidates (5-8).
2. Have user keep 1-3 final keywords.
3. Gather source signals per keyword.
4. Generate candidate angles (5-10) with:
   - hook
   - audience emotion target
   - why-now rationale
   - copyright/safety caution
5. Ask user to classify each angle:
   - `keep`
   - `revise`
   - `reject`
6. If `keep` count is zero, loop once with revised constraints.
7. Save artifacts.

## Quality gate before save

- Each kept angle must map to at least one source signal.
- Remove unsupported trend claims.
- Keep explicit distinction between fact, inference, and speculation.

## Output files

- `./online_idea/{timestamp}.md`
- `./online_idea/{timestamp}.json`

Timestamp format: `YYYYMMDD-HHMMSS`
