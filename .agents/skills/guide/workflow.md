# guide Workflow

Goal: Recommend next skill from current project state and user prompt.

Read contract: `../ytauto-common/output-contract.md`

## State Check

Inspect latest files from:

- `./online_idea`
- `./brainstorm_idea`
- `./story`
- `./transcript`
- `./tts`

## Recommendation Logic

1. If no online idea exists:
   - recommend `idea_fetch_online`
2. If online idea exists but no brainstorm:
   - recommend `brainstorm`
3. If brainstorm exists but no story:
   - recommend `story_creation`
4. If story exists and user asks changes:
   - recommend `story_edit`
5. If story exists and no transcript:
   - recommend `transcript_creation`
6. If transcript exists and no tts:
   - recommend `tts_creation`
7. If tts exists:
   - recommend review/export step and optional re-run from `story_edit` for iteration

## Response Format

- `현재 상태`
- `다음 추천 skill 1순위`
- `대안 skill 2개`
- `바로 실행용 입력 예시`
