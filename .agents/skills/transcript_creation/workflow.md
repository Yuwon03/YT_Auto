# transcript_creation Workflow

Goal: Convert story text into TTS-ready narration transcript.

Read contract: `../ytauto-common/output-contract.md`

## Required Input

- One story file path from `./story`.

## Steps

1. Read story and split into narration segments.
2. Normalize to spoken style:
   - short/clear sentences
   - avoid punctuation overload
   - preserve tone
3. Ask user for transcript style:
   - cinematic
   - calm sleep narration
   - neutral documentary
4. Save outputs.

## Output Files

- `./transcript/{timestamp}.txt`
- `./transcript/{timestamp}.segments.csv`

`{timestamp}` format: `YYYYMMDD-HHMMSS`

## CSV Columns

- `segment_id`
- `text`
- `pause_ms`
- `note`
