# YTAuto Skill Output Contract

Default output directories are fixed at project root:

- `./brainstorm_idea`
- `./online_idea`
- `./story`
- `./transcript`
- `./tts`

File naming rule:

- Use timestamp prefix: `YYYYMMDD-HHMMSS`.
- One file is treated as one YouTube video unit.
- Do not create per-title subdirectories by default.

Cross-skill references:

- `brainstorm` can reference one or more files from `./online_idea`.
- `story_creation` uses `./brainstorm_idea` outputs.
- `story_edit` revises files in `./story`.
- `transcript_creation` uses `./story` outputs.
- `tts_creation` uses `./transcript` outputs.
