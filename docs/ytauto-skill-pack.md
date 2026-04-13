# YTAuto Skill Pack

This project now includes BMAD-style skills for video production flow:

1. `idea_fetch_online`
2. `brainstorm`
3. `story_creation`
4. `story_edit`
5. `transcript_creation`
6. `tts_creation`
7. `guide`

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

## Install

Install the CLI from npm:

```bash
npm install -g @ytauto/ytauto
ytauto install
```

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
- `brainstorm` supports referencing files created by `idea_fetch_online`.
