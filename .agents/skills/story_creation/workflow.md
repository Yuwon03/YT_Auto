# story_creation Workflow

Goal: Produce a complete story draft and scene map from selected brainstorming output plus online references.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## Required input

- Exactly one brainstorm artifact path from `./brainstorm_idea`
- Exactly one online reference artifact path from `./online_idea`

## Preflight checks

1. Verify brainstorm file exists and is readable.
2. Verify online reference file exists and is readable.
3. Verify upstream artifact metadata includes `handoff_ready=true`.
4. Confirm `run_id` and keep same pipeline id.
5. Verify chosen direction and constraints are explicit.
6. Confirm target runtime bracket:
   - short (8-12 min)
   - medium (15-25 min)
   - long (30-45 min)

## Execution steps

1. Run an AI-user concept concretization round before drafting:
   - protagonist motivation
   - conflict ladder
   - reveal timing
   - emotional pacing by act
2. Build story architecture:
   - opening hook
   - escalation beats
   - reveal mechanics
   - unresolved ending hook
3. Generate scene map first.
4. Draft full story aligned to scene map and citations.
5. Run continuity pass:
   - character motivation consistency
   - timeline consistency
   - tone consistency
6. Set `handoff_ready=true` only when story draft + scene map are both complete.
7. Save artifacts.

## Quality gate before save

- Each scene must have purpose and state change.
- Reveal sequence must be causal, not random.
- Ending must not hard-reset conflict without narrative cause.

## Output files

- `./story/{timestamp}.md`
- `./story/{timestamp}.scene-map.md`

Timestamp format: `YYYYMMDD-HHMMSS`
