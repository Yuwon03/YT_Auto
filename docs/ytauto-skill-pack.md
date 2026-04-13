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

## Install From GitHub

After this repository is pushed to GitHub, install directly from Git:

```bash
npm install -g github:<owner>/<repo>
```

Then install skills into the current project:

```bash
ytauto install
```

Codex-only install:

```bash
ytauto install --codex
```

Cursor rule install:

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

Then install from npm:

```bash
npm install -g ytauto
ytauto install
```

Per-project npm install:

```bash
npm install ytauto
npx ytauto install
```

## Notes

- One output file is treated as one YouTube video unit.
- No per-title directory is required by default.
- `brainstorm` supports referencing files created by `idea_fetch_online`.
