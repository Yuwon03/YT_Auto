# YTAuto Skill Output Contract

## Default directories

- `./online_idea`
- `./brainstorm_idea`
- `./story`
- `./transcript`
- `./tts`

## Naming rule

- Prefix output filenames with `YYYYMMDD-HHMMSS`.
- Treat one output file set as one YouTube video unit.
- Do not create title-based nested directories unless user explicitly asks.

## Required metadata block

Every generated markdown/json artifact should include:

- `created_at`
- `source_skill`
- `input_refs` (list)
- `status` (`draft`, `ready`, `needs_review`)

## Cross-skill dependency chain

1. `idea_fetch_online` -> feeds `brainstorm`
2. `brainstorm` -> feeds `story_creation`
3. `story_creation` -> feeds `story_edit` and `transcript_creation`
4. `transcript_creation` -> feeds `tts_creation`
5. `quality_gate` can run after `story_creation`, `transcript_creation`, or `tts_creation`
6. `image_plan` can run after `story_creation` or `story_edit`

## Quality minimum

- No direct adaptation of copyrighted sources.
- Preserve linkable references for any external trend claims.
- Keep tone and style consistent across story and transcript.
- Mark unresolved issues explicitly instead of silently dropping them.
