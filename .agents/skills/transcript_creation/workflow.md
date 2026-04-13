# transcript_creation Workflow

Goal: Convert story draft into narration-ready transcript assets.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## Required input

- One story markdown file from `./story`

## Preflight checks

1. Verify story file exists and is readable.
2. Verify story artifact metadata includes `handoff_ready=true` when available.
3. Confirm `run_id` and keep same pipeline id.

## Execution steps

1. Parse story into narration units.
2. Normalize text for speech clarity:
   - simplify sentence length
   - preserve narrative intent
   - remove punctuation patterns that break TTS
3. Apply selected narration style:
   - cinematic
   - calm_sleep
   - neutral
4. Emit plain transcript and segment CSV.
5. Set `handoff_ready=true` only when transcript text + segment csv are both complete.
6. Save artifacts.

## Quality gate before save

- No segment should exceed practical TTS limits for target runtime.
- Segment order must preserve story sequence.
- Pause values must exist for every row.

## Output files

- `./transcript/{timestamp}.txt`
- `./transcript/{timestamp}.segments.csv`

Timestamp format: `YYYYMMDD-HHMMSS`
