# brainstorm Workflow

Goal: Convert trend signals into one chosen narrative direction for a single video unit.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## On activation

1. Confirm whether `./online_idea` references will be used.
2. If references are used, collect selected file paths explicitly.
3. Confirm desired story mode:
   - sleep-fable
   - cinematic
   - reflective

## Guided discovery prompts

- Core conflict to foreground
- Audience emotion to leave at ending
- Forbidden elements (tone, content, cliches)
- Twist timing (early/mid/late)
- Unresolved thread for continuation

## Execution steps

1. Synthesize constraints and references.
2. Produce 3-5 narrative directions with clear differentiation.
3. Score each direction for:
   - coherence
   - novelty
   - production feasibility
4. Ask user to choose one direction.
5. Apply one revision pass if user requests.
6. Save artifacts.

## Quality gate before save

- Final direction must include conflict, reveal path, ending state.
- Any sensitive real-world topic must be abstracted to fictional context.
- Chosen direction must include at least one unresolved continuation hook.

## Output files

- `./brainstorm_idea/{timestamp}.md`
- `./brainstorm_idea/{timestamp}.json`

Timestamp format: `YYYYMMDD-HHMMSS`
