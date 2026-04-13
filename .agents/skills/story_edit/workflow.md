# story_edit Workflow

Goal: Refine story detail and direction through user instructions.

Read contract: `../ytauto-common/output-contract.md`

## Required Input

- Existing story file path from `./story`.
- User edit instructions (tone/pace/scene changes/dialogue constraints/etc.).

## Steps

1. Parse user edits into explicit change list.
2. Confirm non-negotiables and allowed rewrite scope.
3. Apply edits while preserving continuity.
4. Produce revised version plus edit log.
5. Save outputs.

## Output Files

- `./story/{timestamp}-rev.md`
- `./story/{timestamp}-edit-log.md`

`{timestamp}` format: `YYYYMMDD-HHMMSS`

## Edit Log Template

```md
# Story Edit Log

## Source
- input_file:

## Applied Changes
- [section] before -> after

## Deferred / Rejected
- item:
  - reason:
```
