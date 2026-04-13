# image_plan Workflow

Goal: Build one-image-per-chapter plan using external license-safe sources.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## Required input

- One story file from `./story`
- Optional quality report from `quality_gate`

## Preflight checks

1. Verify story file exists and is readable.
2. Verify story artifact metadata includes `handoff_ready=true` when available.
3. Confirm `run_id` and keep same pipeline id.

## Source policy

- Prefer public domain or permissive licenses.
- Record source URL, license type, and attribution note for each image slot.
- Do not claim rights that are not verified.

## Execution steps

1. Split story into chapter/image slots.
2. For each slot produce:
   - visual intent
   - keyword query set (3-6 keywords)
   - source candidates (at least 2)
   - usage/license notes
3. Flag slots with insufficient safe sources as `needs_review`.
4. Set `handoff_ready=true` only when all required slots have usable candidates.
5. Save artifacts.

## Quality gate before save

- One slot per chapter minimum.
- Every slot has at least one license note.
- No candidate source is missing URL or identifier.

## Output files

- `./story/{timestamp}-image-plan.md`
- `./story/{timestamp}-image-plan.json`

Timestamp format: `YYYYMMDD-HHMMSS`
