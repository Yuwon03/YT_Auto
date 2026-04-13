# YTAuto Skill Pack

This project now includes BMAD-style skills for video production flow:

1. `brainstorm`
2. `idea_fetch_online`
3. `story_creation`
4. `story_edit`
5. `quality_gate`
6. `image_plan`
7. `transcript_creation`
8. `tts_creation`
9. `guide`

## Default Output Paths

- `./online_idea`
- `./brainstorm_idea`
- `./story`
- `./transcript`
- `./tts`

## Suggested Flow

1. Run `guide`
2. Run recommended skill
3. Repeat `guide` until TTS is generated

## Handoff Rules

To keep cross-skill collaboration reliable, each artifact should carry:

- `run_id`
- `step_id`
- `upstream_refs`
- `handoff_ready`
- `handoff_notes`

Core handoff checks:

1. `brainstorm` -> `idea_fetch_online`: one selected idea + duration + concept attributes
2. `idea_fetch_online` -> `story_creation`: consolidated citation file with user edits/appends
3. `story_creation|story_edit` -> `transcript_creation`: story + scene map
4. `transcript_creation` -> `tts_creation`: transcript + segment csv

Successful final outcome criteria:

- final TTS package exists for the active run
- latest quality report is `ready`
- no blocking artifacts in the run are marked `handoff_ready=false`

## Install

Install the CLI from npm:

```bash
npx @ytauto/ytauto install
```

This downloads the CLI and installs the default setup into the current directory. Run `ytauto install` later to reconfigure with Space-based multi-select after global install.

Codex-only:

```bash
ytauto install --codex
```

Cursor-only:

```bash
ytauto install --cursor
```

Install into another project:

```bash
ytauto install --all --target /path/to/project
```

## Publish To npm

```bash
npm login
npm publish --access public
```

## Try Locally

From this repository:

```bash
node bin/ytauto.mjs list
node bin/ytauto.mjs install
```

To test install into a temporary project:

```bash
node bin/ytauto.mjs install --all --target /tmp/ytauto-test --force
```

## Notes

- One output file is treated as one YouTube video unit.
- No per-title directory is required by default.
- `brainstorm` should lock idea + duration + concept attributes first.
- `idea_fetch_online` should persist one consolidated file (`{timestamp}.md`) with citations and user edit/append history.
- `tts_creation` should use `edge-tts` (Microsoft Neural Voice).
