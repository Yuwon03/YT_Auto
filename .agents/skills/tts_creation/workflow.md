# tts_creation Workflow

Goal: Produce voice output package from transcript input.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## Required input

- Transcript text or segment CSV from `./transcript`

## Preflight checks

1. Verify transcript source exists and is readable.
2. Verify transcript artifact metadata includes `handoff_ready=true` when available.
3. Confirm `run_id` and keep same pipeline id.

## Execution steps

1. Confirm voice profile:
   - provider: `edge-tts`
   - voice id: Microsoft Neural Voice id (for example `en-US-JennyNeural`)
   - rate
   - pitch
2. Run TTS generation with `edge-tts`.
3. If runtime/provider is unavailable:
   - generate fallback request doc with `edge-tts` install/run guidance
   - set output status to `runtime_missing`
4. If generation succeeds:
   - verify output file exists and non-zero size
   - set output status to `ok`
5. Set `handoff_ready=true` only when output package is complete for selected path.
6. Save artifacts.

## Quality gate before save

- Metadata json must include source transcript path.
- Failure case must be actionable, not generic.
- Success case must include output duration estimate when available.

## Output files

Success:

- `./tts/{timestamp}.mp3`
- `./tts/{timestamp}.json`

Runtime missing:

- `./tts/{timestamp}.tts-request.md`
- `./tts/{timestamp}.json`

Timestamp format: `YYYYMMDD-HHMMSS`
