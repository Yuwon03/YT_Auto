# story_creation Workflow

Goal: Produce a complete story draft and scene map from selected brainstorming output.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## Required input

- Exactly one brainstorm artifact path from `./brainstorm_idea`

## Preflight checks

1. Verify brainstorm file exists and is readable.
2. Verify chosen direction and constraints are explicit.
3. Confirm target runtime bracket:
   - short (8-12 min)
   - medium (15-25 min)
   - long (30-45 min)

## Execution steps

1. Build story architecture:
   - opening hook
   - escalation beats
   - reveal mechanics
   - unresolved ending hook
2. Generate scene map first.
3. Draft full story aligned to scene map.
4. Run continuity pass:
   - character motivation consistency
   - timeline consistency
   - tone consistency
5. Save artifacts.

## Quality gate before save

- Each scene must have purpose and state change.
- Reveal sequence must be causal, not random.
- Ending must not hard-reset conflict without narrative cause.

## Output files

- `./story/{timestamp}.md`
- `./story/{timestamp}.scene-map.md`

Timestamp format: `YYYYMMDD-HHMMSS`
