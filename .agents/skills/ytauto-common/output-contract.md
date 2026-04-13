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
- Use one logical `run_id` per pipeline execution. Recommended: same as first timestamp.

## Required metadata block

Every generated markdown/json artifact should include:

- `created_at`
- `source_skill`
- `input_refs` (list)
- `status` (`draft`, `ready`, `needs_review`)
- `run_id` (shared pipeline id)
- `step_id` (`brainstorm`, `idea_fetch_online`, `story_creation`, `story_edit`, `quality_gate`, `image_plan`, `transcript_creation`, `tts_creation`)
- `upstream_refs` (list of exact source files this artifact used)
- `handoff_ready` (`true` or `false`)
- `handoff_notes` (why this is or is not ready for next skill)

For `idea_fetch_online`, metadata should also include:

- `source_collection_path` (`web_search`, `external_api`, `manual_input`)
- `source_collection_notes`

## Cross-skill dependency chain

1. `brainstorm` -> defines idea, duration, and episode concept
2. `idea_fetch_online` -> enriches brainstorm output with citations/references
3. `story_creation` -> uses brainstorm + online references
4. `story_edit` -> revises story with user direction
5. `transcript_creation` -> uses final story output
6. `tts_creation` -> uses transcript output with `edge-tts` (Microsoft Neural Voice)
7. `quality_gate` can run after `story_creation`, `transcript_creation`, or `tts_creation`
8. `image_plan` can run after `story_creation` or `story_edit`

`idea_fetch_online` persistence contract:

- Save one consolidated reference file with citations + user edits + chat summary.
- Required set:
  - `./online_idea/{timestamp}.md`

## Handoff readiness rules

- `brainstorm` -> `idea_fetch_online`:
  - one selected idea exists
  - duration target and concept attributes are explicit
- `idea_fetch_online` -> `story_creation`:
  - citations exist with verifiable source links/identifiers
  - user edits/appended references are recorded in same file
- `story_creation` -> `transcript_creation`:
  - story draft and scene map both exist
- `story_edit` -> `transcript_creation`:
  - revised story exists with resolved blocking edits
- `story_creation|story_edit` -> `image_plan`:
  - source story file marked `handoff_ready=true`
- `story|transcript|tts` -> `quality_gate`:
  - target artifact paths are explicit
- `transcript_creation` -> `tts_creation`:
  - transcript text exists
  - segments csv exists with pause values

## Fallback policy

- If online/tool access is unavailable, continue in degraded mode and set:
  - `handoff_ready=true` only when minimum contract is still met
  - `handoff_notes` to explain missing capabilities and risks

## Quality minimum

- No direct adaptation of copyrighted sources.
- Preserve linkable references for any external trend claims.
- Keep tone and style consistent across story and transcript.
- Mark unresolved issues explicitly instead of silently dropping them.
