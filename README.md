# YTAuto

CLI installer for YTAuto agent skills.

YTAuto installs a BMAD-style skill pack for YouTube workflows: trend collection, guided brainstorming, story writing, quality checks, image planning, transcript creation, and TTS preparation.

## Install

```bash
npx @ytauto/ytauto install
```

This downloads the CLI and installs the default setup into the current directory:

- Codex skills in `.agents/skills`
- Cursor rule in `.cursor/rules/ytauto-skills.mdc`
- Working folders: `online_idea`, `brainstorm_idea`, `story`, `transcript`, `tts`

To install the CLI globally:

```bash
npm install -g @ytauto/ytauto
```

The setup selector supports Space-based multi-select:

- `Space`: select or unselect
- `Enter`: confirm
- `a`: select all
- `n`: select none
- `q`: cancel

## CLI

Install into the current project:

```bash
ytauto install
```

Install without prompts:

```bash
ytauto install --all --target /path/to/project --force
```

List included skills:

```bash
ytauto list
```

## Skills

- `idea_fetch_online`
- `brainstorm`
- `story_creation`
- `story_edit`
- `quality_gate`
- `image_plan`
- `transcript_creation`
- `tts_creation`
- `guide`

## Output Directories

The installer also creates these working directories in the target project:

- `./online_idea`
- `./brainstorm_idea`
- `./story`
- `./transcript`
- `./tts`

## Local Test

From this repository:

```bash
node bin/ytauto.mjs list
node bin/ytauto.mjs install --all --target /tmp/ytauto-test --force
```

## Publishing

Use npm Trusted Publisher with these settings:

- Publisher: `GitHub Actions`
- Organization or user: `Yuwon03`
- Repository: `YT_Auto`
- Workflow filename: `publish.yml`
- Environment name: leave blank

Then publish from GitHub Actions by creating a GitHub release or manually running the `Publish to npm` workflow.

The npm package name for this CLI is `@ytauto/ytauto`.
