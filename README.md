# YTAuto

BMAD-style skills for YouTube idea, story, transcript, and TTS workflows.

## Install

From GitHub:

```bash
npm install -g github:<owner>/<repo>
ytauto install
```

From npm after publishing:

```bash
npm install -g @ytauto/ytauto
ytauto install
```

Or install per-project:

```bash
npm install @ytauto/ytauto
npx ytauto install
```

## CLI

Interactive install:

```bash
ytauto install
```

Non-interactive install:

```bash
ytauto install --all --target /path/to/project
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

- `./online_idea`
- `./brainstorm_idea`
- `./story`
- `./transcript`
- `./tts`
