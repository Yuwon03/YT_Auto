# story_creation Workflow

Goal: Generate the base long-form story for one video.

Read contract: `../ytauto-common/output-contract.md`

## Required Input

- One selected brainstorm file from `./brainstorm_idea`.

## Steps

1. Read selected brainstorm file.
2. Confirm target format with user:
   - narration tone
   - pacing
   - estimated length
3. Build story architecture:
   - opening hook
   - progression beats
   - twist reveal path
   - ending with unresolved thread
4. Write full draft.
5. Save outputs.

## Output Files

- `./story/{timestamp}.md`
- `./story/{timestamp}.scene-map.md`

`{timestamp}` format: `YYYYMMDD-HHMMSS`

## Story Rules

- Keep result original (no direct adaptation).
- Keep continuity with selected brainstorm.
- Keep conflict depth and ambiguity when requested by user.

## Scene Map Template

```md
# Scene Map
1. Scene title
   - purpose
   - conflict shift
   - emotional target
```
