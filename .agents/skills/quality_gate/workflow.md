# quality_gate Workflow

Goal: Produce a concrete quality report before transcript, TTS, or publish steps.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## Required input

- At least one target artifact path:
  - `./story/*.md`
  - `./transcript/*.txt` or `./transcript/*.segments.csv`
  - `./tts/*.json`

## Preflight checks

1. Confirm `run_id` from target artifacts when available.
2. Verify target files exist and are readable.
3. Record whether upstream artifacts were `handoff_ready` at execution time.

## Gate profile

1. Detect target type (`story`, `transcript`, `tts`, or mixed).
2. Apply matching checks:
   - story: continuity, reveal logic, unresolved hook, copyright-risk phrasing
   - transcript: speech clarity, segmentation quality, pause consistency
   - tts: metadata completeness, runtime status, fallback action quality
3. Score each check with:
   - `pass`
   - `warn`
   - `fail`

## Execution steps

1. Parse input artifacts.
2. Run per-check evaluation with short evidence lines.
3. Build fix list prioritized by impact.
4. Set overall status:
   - `ready` if no `fail`
   - `needs_review` if any `fail`
5. Set `handoff_ready=true` only when overall status is `ready`.
6. Save report.

## Output files

- `./story/{timestamp}-quality-report.md`
- `./story/{timestamp}-quality-report.json`

Timestamp format: `YYYYMMDD-HHMMSS`
