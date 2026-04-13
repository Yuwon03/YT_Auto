# brainstorm Workflow

Goal: Define one production-ready episode concept with clear creative constraints before any online citation fetch.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## On activation

1. Confirm `run_id`:
   - reuse existing `run_id` if continuing a pipeline
   - otherwise initialize with current timestamp
2. Confirm desired story mode:
   - sleep-fable
   - cinematic
   - reflective
3. Confirm episode duration target:
   - short (8-12 min)
   - medium (15-25 min)
   - long (30-45 min)
4. Confirm concept attributes:
   - audience profile
   - world setting
   - conflict scale
   - narrative POV
   - ending emotion
   - content boundaries (must avoid)
   - series intent (single episode or series arc)

## Guided discovery prompts

- Core conflict to foreground
- Audience emotion to leave at ending
- Forbidden elements (tone, content, cliches)
- Twist timing (early/mid/late)
- Unresolved thread for continuation

## Execution steps

1. Synthesize user constraints into a concept brief.
2. Produce 3-5 narrative directions with clear differentiation.
3. Score each direction for:
   - coherence
   - novelty
   - production feasibility
4. Ask user to choose one direction.
5. Run a short AI-user clarification round to lock details:
   - episode objective
   - pacing
   - core hook
   - unresolved continuation hook
6. Apply one revision pass if user requests.
7. Set `handoff_ready=true` only if exactly one final concept is selected and duration target is fixed.
8. Save artifacts.

## Quality gate before save

- Final concept must include conflict, reveal path, ending state, and duration target.
- Any sensitive real-world topic must be abstracted to fictional context.
- Chosen direction must include at least one unresolved continuation hook.

## Output files

- `./brainstorm_idea/{timestamp}.md`
- `./brainstorm_idea/{timestamp}.json`

Timestamp format: `YYYYMMDD-HHMMSS`
