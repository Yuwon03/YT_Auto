# tts_creation Workflow

Goal: Produce narration audio from transcript.

Read contract: `../ytauto-common/output-contract.md`

## Required Input

- One transcript file path from `./transcript`.

## Steps

1. Confirm voice settings with user:
   - voice id
   - speaking rate
   - pitch
2. Attempt audio generation using available TTS runtime.
3. If runtime is unavailable, stop generation and write a clear request file.
4. Save outputs.

## Output Files

When audio generation succeeds:
- `./tts/{timestamp}.mp3`
- `./tts/{timestamp}.json`

When audio generation fails due to environment/runtime:
- `./tts/{timestamp}.tts-request.md`
- `./tts/{timestamp}.json`

`{timestamp}` format: `YYYYMMDD-HHMMSS`

## JSON Keys

- `created_at`
- `input_transcript`
- `voice`
- `rate`
- `pitch`
- `status` (`ok` or `runtime_missing`)
- `output_audio` (nullable)
