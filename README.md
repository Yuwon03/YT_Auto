# YTAuto

CLI installer for YTAuto agent skills.

YTAuto installs a small set of Codex/Cursor-friendly skills for YouTube idea collection, brainstorming, story writing, transcript creation, and TTS preparation.

## Install

```bash
npm install -g @ytauto/ytauto
ytauto install
```

`ytauto install` opens an interactive selector:

- `1`: Codex only, installs skills to `.agents/skills`
- `2`: Cursor only, creates `.cursor/rules/ytauto-skills.mdc`
- `3`: Both Codex and Cursor

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
