#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");

const skillNames = [
  "idea_fetch_online",
  "brainstorm",
  "story_creation",
  "story_edit",
  "transcript_creation",
  "tts_creation",
  "guide",
  "ytauto-common",
];

function usage() {
  console.log(`YTAuto Skill Pack

Usage:
  ytauto install [--codex] [--cursor] [--all] [--target <path>] [--force] [--yes]
  ytauto list

Defaults:
  install runs an interactive selector unless --codex, --cursor, --all, or --yes is provided.

Targets:
  --codex   Copy skills into <target>/.agents/skills
  --cursor  Also create <target>/.cursor/rules/ytauto-skills.mdc
  --all     Enable both --codex and --cursor
  --yes     Non-interactive install with --all --target .
`);
}

function parseArgs(argv) {
  const args = {
    command: argv[2] ?? "help",
    codex: false,
    cursor: false,
    target: process.cwd(),
    force: false,
    yes: false,
    hasInstallTargetFlag: false,
  };

  for (let index = 3; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--codex") {
      args.codex = true;
      args.hasInstallTargetFlag = true;
    } else if (value === "--cursor") {
      args.cursor = true;
      args.hasInstallTargetFlag = true;
    }
    else if (value === "--all") {
      args.codex = true;
      args.cursor = true;
      args.hasInstallTargetFlag = true;
    } else if (value === "--force") args.force = true;
    else if (value === "--yes" || value === "-y") {
      args.yes = true;
      args.codex = true;
      args.cursor = true;
      args.hasInstallTargetFlag = true;
    }
    else if (value === "--target") {
      index += 1;
      if (!argv[index]) throw new Error("--target requires a path");
      args.target = argv[index];
    } else {
      throw new Error(`Unknown argument: ${value}`);
    }
  }

  return args;
}

async function askInstallOptions(args) {
  if (args.command !== "install" || args.hasInstallTargetFlag) {
    return args;
  }

  const scriptedAnswers = input.isTTY ? null : readFileSync(0, "utf8").split(/\r?\n/);
  let scriptedAnswerIndex = 0;
  const rl = input.isTTY ? createInterface({ input, output }) : null;
  const ask = async (question) => {
    if (scriptedAnswers) {
      const answer = scriptedAnswers[scriptedAnswerIndex++] ?? "";
      output.write(question);
      output.write(`${answer}\n`);
      return answer;
    }
    return rl.question(question);
  };

  try {
    console.log("YTAuto skill installer");
    console.log("1) Codex only (.agents/skills)");
    console.log("2) Cursor only (.cursor/rules)");
    console.log("3) Both Codex and Cursor");
    const targetChoice = (await ask("Install target [1-3, default 3]: ")).trim() || "3";
    if (targetChoice === "1") args.codex = true;
    else if (targetChoice === "2") args.cursor = true;
    else {
      args.codex = true;
      args.cursor = true;
    }

    const targetDir = (await ask(`Project directory [${args.target}]: `)).trim();
    if (targetDir) args.target = targetDir;

    const forceAnswer = (await ask("Overwrite existing skill files? [y/N]: ")).trim().toLowerCase();
    args.force = forceAnswer === "y" || forceAnswer === "yes";
    return args;
  } finally {
    if (rl) rl.close();
  }
}

function copyDir(source, destination, force) {
  if (!existsSync(source)) {
    throw new Error(`Missing source directory: ${source}`);
  }
  mkdirSync(destination, { recursive: true });
  for (const entry of readdirSync(source)) {
    const sourcePath = join(source, entry);
    const destinationPath = join(destination, entry);
    const stats = statSync(sourcePath);
    if (stats.isDirectory()) {
      copyDir(sourcePath, destinationPath, force);
      continue;
    }
    if (existsSync(destinationPath) && !force) {
      continue;
    }
    copyFileSync(sourcePath, destinationPath);
  }
}

function installCodexSkills(target, force) {
  const destinationRoot = resolve(target, ".agents", "skills");
  mkdirSync(destinationRoot, { recursive: true });
  for (const skillName of skillNames) {
    const source = resolve(packageRoot, ".agents", "skills", skillName);
    const destination = join(destinationRoot, skillName);
    copyDir(source, destination, force);
  }
  return destinationRoot;
}

function readSkillDescription(skillName) {
  const skillFile = resolve(packageRoot, ".agents", "skills", skillName, "SKILL.md");
  if (!existsSync(skillFile)) return "";
  const content = readFileSync(skillFile, "utf8");
  const match = content.match(/description:\s*['"]?(.+?)['"]?\n/);
  return match ? match[1] : "";
}

function installCursorRule(target) {
  const rulesRoot = resolve(target, ".cursor", "rules");
  mkdirSync(rulesRoot, { recursive: true });
  const skillLines = skillNames
    .filter((skillName) => skillName !== "ytauto-common")
    .map((skillName) => `- \`${skillName}\`: ${readSkillDescription(skillName)}`);

  const content = `---
description: YTAuto skill pack routing for YouTube idea, story, transcript, and TTS workflows.
globs:
  - "**/*"
alwaysApply: false
---

# YTAuto Skill Pack

When the user asks for YouTube automation, idea generation, story creation, transcript creation, or TTS workflow work, use the local skills installed in \`.agents/skills\`.

Available skills:

${skillLines.join("\n")}

Default output directories:

- \`./online_idea\`
- \`./brainstorm_idea\`
- \`./story\`
- \`./transcript\`
- \`./tts\`

Recommended flow:

1. \`guide\`
2. \`idea_fetch_online\`
3. \`brainstorm\`
4. \`story_creation\`
5. \`story_edit\` when user asks for revision
6. \`transcript_creation\`
7. \`tts_creation\`
`;

  const rulePath = join(rulesRoot, "ytauto-skills.mdc");
  writeFileSync(rulePath, content, "utf8");
  return rulePath;
}

function ensureOutputDirs(target) {
  for (const name of ["online_idea", "brainstorm_idea", "story", "transcript", "tts"]) {
    mkdirSync(resolve(target, name), { recursive: true });
  }
}

try {
  const args = await askInstallOptions(parseArgs(process.argv));
  if (args.command === "help" || args.command === "--help" || args.command === "-h") {
    usage();
    process.exit(0);
  }
  if (args.command === "list") {
    for (const skillName of skillNames) console.log(skillName);
    process.exit(0);
  }
  if (args.command !== "install") {
    throw new Error(`Unknown command: ${args.command}`);
  }

  const target = resolve(args.target);
  ensureOutputDirs(target);
  if (args.codex) {
    const destination = installCodexSkills(target, args.force);
    console.log(`Installed Codex skills: ${destination}`);
  }
  if (args.cursor) {
    const rulePath = installCursorRule(target);
    console.log(`Installed Cursor rule: ${rulePath}`);
  }
  console.log("Done.");
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
