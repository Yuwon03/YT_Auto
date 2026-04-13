# YTAuto

CLI installer for YTAuto agent skills.

YTAuto installs a BMAD-style skill pack for YouTube workflows: guided brainstorming, citation enrichment, story writing, quality checks, image planning, transcript creation, and edge-tts preparation.

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

## Logical Flow

Use one shared `run_id` through the pipeline so every step can reuse upstream artifacts naturally.

1. `brainstorm`
2. `idea_fetch_online`
3. `story_creation`
4. `story_edit` (optional revision loop)
5. `quality_gate` (recommended before transcript)
6. `image_plan` (optional visual sourcing)
7. `transcript_creation`
8. `tts_creation` (`edge-tts`, Microsoft Neural Voice)
9. `quality_gate` (final readiness check)

Each generated artifact should include:

- `run_id`
- `step_id`
- `upstream_refs`
- `handoff_ready`
- `handoff_notes`

Final outcome is considered successful when:

- TTS output package exists (`.mp3` + `.json`, or actionable runtime-missing package)
- latest quality decision is `ready`
- no blocking `handoff_ready=false` artifacts remain in the active run

## Output Directories

The installer also creates these working directories in the target project:

- `./online_idea`
- `./brainstorm_idea`
- `./story`
- `./transcript`
- `./tts`

`idea_fetch_online` writes one consolidated reference artifact in `./online_idea`:

- `{timestamp}.md`

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
