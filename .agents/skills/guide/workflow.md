# guide Workflow

Goal: Provide state-aware next-step guidance with clear reasons and immediate commands.

Read first:

- `../ytauto-common/output-contract.md`
- `./checklist.md`
- `./template.md`

## State scan

Inspect latest artifacts in:

- `./online_idea`
- `./brainstorm_idea`
- `./story`
- `./transcript`
- `./tts`

Also inspect optional quality artifacts:

- `./story/*quality*`
- `./story/*image-plan*`

## Recommendation logic

1. If no online idea artifact:
   - primary: `idea_fetch_online`
2. If online idea exists but no brainstorm:
   - primary: `brainstorm`
3. If brainstorm exists but no story:
   - primary: `story_creation`
4. If story exists and user requests changes:
   - primary: `story_edit`
5. If story exists but transcript missing:
   - primary: `transcript_creation`
6. If transcript exists but tts missing:
   - primary: `tts_creation`
7. If story exists but image plan missing:
   - suggest `image_plan`
8. If draft quality is uncertain:
   - suggest `quality_gate`
9. If all core outputs exist:
   - suggest iteration entrypoint (`story_edit` or `quality_gate`)

## Response format

- Current state summary
- Primary recommended skill with reason
- Two alternative skills with tradeoff
- Copy-pastable next command
