# brainstorm Workflow

Goal: Convert trend signals into a clear story direction for one video.

Read contract: `../ytauto-common/output-contract.md`

## Steps

1. Ask whether to reference `./online_idea` files.
2. If yes, ask user to pick one or more files and extract key signals.
3. Run guided questions:
   - what conflict to focus on
   - what emotion to leave with listener
   - what to avoid
   - where to place twist
   - what unresolved question to carry
4. Propose 3-5 narrative directions with different tone/structure.
5. User selects one direction and requests edits.
6. Freeze selected concept and save outputs.

## Output Files

- `./brainstorm_idea/{timestamp}.md`
- `./brainstorm_idea/{timestamp}.json`

`{timestamp}` format: `YYYYMMDD-HHMMSS`

## Markdown Output Template

```md
# Brainstorm Idea

## References
- online_idea_files:

## Guided Answers
- conflict:
- target_emotion:
- avoid_list:
- twist_timing:
- unresolved_question:

## Candidate Directions
1. title:
   - concept:
   - strengths:
   - risks:

## Final Selection
- selected_direction:
- revision_notes:
```

## JSON Output Keys

- `created_at`
- `references`
- `guided_answers`
- `candidate_directions[]`
- `selected_direction`
