# YTAuto

CLI installer for YTAuto agent skills.

YTAuto installs a small set of Codex/Cursor-friendly skills for YouTube idea collection, brainstorming, story writing, transcript creation, and TTS preparation.

## Install

```bash
npm install -g @ytauto/ytauto
```

During installation, YTAuto installs the default setup into the directory where you ran the command:

- Codex skills in `.agents/skills`
- Cursor rule in `.cursor/rules/ytauto-skills.mdc`
- Working folders: `online_idea`, `brainstorm_idea`, `story`, `transcript`, `tts`

To rerun setup or change the selection:

```bash
ytauto install
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
