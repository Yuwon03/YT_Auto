#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import readline from "node:readline";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const useColor = !process.env.NO_COLOR;
const color = {
  blue: (value) => useColor ? `\x1b[34m${value}\x1b[0m` : value,
  cyan: (value) => useColor ? `\x1b[36m${value}\x1b[0m` : value,
  green: (value) => useColor ? `\x1b[32m${value}\x1b[0m` : value,
  gray: (value) => useColor ? `\x1b[90m${value}\x1b[0m` : value,
  bold: (value) => useColor ? `\x1b[1m${value}\x1b[0m` : value,
};

const skillNames = [
  "idea_fetch_online",
  "brainstorm",
  "story_creation",
  "story_edit",
  "quality_gate",
  "image_plan",
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

function printBox(title, lines = []) {
  const width = Math.max(52, title.length + 4, ...lines.map((line) => stripAnsi(line).length + 4));
  const top = `┌${"─".repeat(width - 2)}┐`;
  const bottom = `└${"─".repeat(width - 2)}┘`;
  console.log(color.cyan(top));
  console.log(color.cyan(`│ ${padRight(color.bold(title), width - 4)} │`));
  if (lines.length > 0) {
    console.log(color.cyan(`├${"─".repeat(width - 2)}┤`));
    for (const line of lines) {
      console.log(color.cyan("│ ") + padRight(line, width - 4) + color.cyan(" │"));
    }
  }
  console.log(color.cyan(bottom));
}

function stripAnsi(value) {
  return value.replace(/\x1b\[[0-9;]*m/g, "");
}

function padRight(value, width) {
  const visible = stripAnsi(value).length;
  return value + " ".repeat(Math.max(0, width - visible));
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

  if (!input.isTTY) {
    args.codex = true;
    args.cursor = true;
    return args;
  }

  const rl = createInterface({ input, output });

  try {
    printBox("YTAuto setup", [
      "Choose one or more integrations.",
      `${color.gray("Use ↑/↓ to move, Space to select, Enter to continue.")}`,
    ]);
    const selections = await promptMultiSelect({
      title: "Integrations",
      options: [
        { label: "Codex skills", detail: ".agents/skills", value: "codex" },
        { label: "Cursor rules", detail: ".cursor/rules/ytauto-skills.mdc", value: "cursor" },
      ],
      defaults: ["codex", "cursor"],
    });
    args.codex = selections.includes("codex");
    args.cursor = selections.includes("cursor");

    const targetDir = (await rl.question(`${color.bold("Project directory")} ${color.gray(`[${args.target}]`)}: `)).trim();
    if (targetDir) args.target = targetDir;

    const forceAnswer = (await rl.question(`${color.bold("Overwrite existing skill files?")} ${color.gray("[y/N]")}: `)).trim().toLowerCase();
    args.force = forceAnswer === "y" || forceAnswer === "yes";
    return args;
  } finally {
    if (rl) rl.close();
  }
}

async function promptMultiSelect({ title, options, defaults }) {
  let cursor = 0;
  const selected = new Set(defaults);

  readline.emitKeypressEvents(input);
  input.setRawMode(true);
  output.write("\x1b[?25l");

  const render = () => {
    output.write("\x1b[2J\x1b[H");
    console.log(color.bold(title));
    console.log(color.gray("Space: select  Enter: confirm  a: all  n: none  q: cancel"));
    console.log("");
    options.forEach((option, index) => {
      const pointer = index === cursor ? color.blue("›") : " ";
      const mark = selected.has(option.value) ? color.green("●") : "○";
      console.log(`${pointer} ${mark} ${option.label} ${color.gray(option.detail)}`);
    });
  };

  render();
  try {
    return await new Promise((resolvePrompt, rejectPrompt) => {
      const onKeypress = (_value, key) => {
        if (key.name === "up") cursor = (cursor - 1 + options.length) % options.length;
        else if (key.name === "down") cursor = (cursor + 1) % options.length;
        else if (key.name === "space") {
          const value = options[cursor].value;
          if (selected.has(value)) selected.delete(value);
          else selected.add(value);
        } else if (key.name === "a") {
          options.forEach((option) => selected.add(option.value));
        } else if (key.name === "n") {
          selected.clear();
        } else if (key.name === "return") {
          if (selected.size === 0) {
            options.forEach((option) => selected.add(option.value));
          }
          cleanup();
          resolvePrompt([...selected]);
          return;
        } else if ((key.ctrl && key.name === "c") || key.name === "q" || key.name === "escape") {
          cleanup();
          rejectPrompt(new Error("Installation cancelled."));
          return;
        }
        render();
      };
      const cleanup = () => {
        input.off("keypress", onKeypress);
        input.setRawMode(false);
        output.write("\x1b[?25h");
        output.write("\x1b[2J\x1b[H");
      };
      input.on("keypress", onKeypress);
    });
  } finally {
    if (input.isRaw) input.setRawMode(false);
    output.write("\x1b[?25h");
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

Optional artifacts in \`./story\`:

- \`*-quality-report.md|json\`
- \`*-image-plan.md|json\`

Recommended flow:

1. \`guide\`
2. \`idea_fetch_online\`
3. \`brainstorm\`
4. \`story_creation\`
5. \`quality_gate\`
6. \`image_plan\`
7. \`story_edit\` when user asks for revision
8. \`transcript_creation\`
9. \`tts_creation\`
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

function executeInstall(args) {
  const target = resolve(args.target);
  ensureOutputDirs(target);
  const installed = [];
  if (args.codex) {
    const destination = installCodexSkills(target, args.force);
    installed.push(`Codex skills → ${destination}`);
  }
  if (args.cursor) {
    const rulePath = installCursorRule(target);
    installed.push(`Cursor rule → ${rulePath}`);
  }
  printBox("YTAuto installed", [
    `Target: ${target}`,
    ...installed,
    "Workspace folders → online_idea, brainstorm_idea, story, transcript, tts",
  ]);
}

async function runPostinstall() {
  const target = process.env.INIT_CWD || process.cwd();
  if (!input.isTTY || process.env.CI) {
    executeInstall({
      command: "install",
      codex: true,
      cursor: true,
      target,
      force: false,
      yes: true,
      hasInstallTargetFlag: true,
    });
    return;
  }

  const rl = createInterface({ input, output });
  try {
    const answer = (await rl.question(`Configure YTAuto skills now in ${target}? [Y/n]: `)).trim().toLowerCase();
    if (answer === "n" || answer === "no") {
      console.log(`Skipped. Run "ytauto install" when ready.`);
      return;
    }
  } finally {
    rl.close();
  }

  const args = await askInstallOptions({
    command: "install",
    codex: false,
    cursor: false,
    target,
    force: false,
    yes: false,
    hasInstallTargetFlag: false,
  });
  executeInstall(args);
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
  if (args.command === "postinstall") {
    await runPostinstall();
    process.exit(0);
  }
  if (args.command !== "install") {
    throw new Error(`Unknown command: ${args.command}`);
  }

  executeInstall(args);
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
