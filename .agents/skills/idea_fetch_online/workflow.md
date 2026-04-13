# idea_fetch_online Workflow

Goal: Enrich one selected brainstorm concept with online citations and editable references in a single consolidated file.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## On activation

1. Require exactly one brainstorm artifact path from `./brainstorm_idea`.
2. Verify selected brainstorm artifact has `handoff_ready=true`.
3. Confirm `run_id` and keep same pipeline id.
4. Ask mode:
   - `ai_suggest`
   - `user_keywords`
   - `mixed`
5. Confirm source collection path:
   - `web_search` (live browsing/search tools)
   - `external_api` (user-provided API integration)
   - `manual_input` (user-supplied references only)
6. Require at least one verifiable source input path:
   - live links
   - source names with searchable identifiers
   - user provided summaries marked as `manual_input`

## Execution steps

1. Extract query keywords from brainstorm concept attributes.
2. Gather 3-8 citations aligned to selected concept and duration target.
3. Normalize each citation with:
   - title/source
   - link_or_identifier
   - relevance to concept
   - reliability note
4. Present references to user and allow edit/append/delete.
5. Record user modifications and final accepted reference list.
6. If web/API access is unavailable, continue in `manual_input` mode and mark the limitation in metadata.
7. Set `handoff_ready=true` only when at least 3 usable citations remain after user edits.
8. Save one consolidated artifact.

## Quality gate before save

- Each citation must map to at least one concept element from brainstorm output.
- Remove unsupported trend claims.
- Keep explicit distinction between fact, inference, and speculation.
- Include conversation summary of user edits/appends in same file.

## Output files

- `./online_idea/{timestamp}.md`

Timestamp format: `YYYYMMDD-HHMMSS`
