#!/usr/bin/env bun
// Runs evals/cases.yaml against an agent in its real setup, read-only, one temp cwd per case.
// Usage: bun evals/run.ts [claude|pi|codex] [prompt filter] [--runs N] [-- extra agent args]
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import cases from "./cases.yaml";

type Case = { prompt: string; skills?: string[]; not_skills?: string[]; regex?: string };
type Run = { skills: Set<string>; text: string };
type Agent = { cmd: string[]; parse: (event: any, run: Run) => void };

const JOBS = 4;
const TIMEOUT_MS = 300_000;
// under $HOME like real projects: claude skips ~/.claude/AGENTS.md for cwds outside it (e.g. /tmp)
const TMP = join(homedir(), ".cache", "agent-eval");

// skill names from paths like ~/.agents/skills/bash/SKILL.md
const addSkillPaths = (run: Run, s?: string) => {
  for (const m of s?.matchAll(/([\w-]+)\/SKILL\.md/g) ?? []) run.skills.add(m[1]);
};

const agents: Record<string, Agent> = {
  claude: {
    // variadic tool flags first, so the appended prompt isn't read as a tool name
    cmd: ["claude", "-p", "--allowedTools", "Read,Glob,Grep,Skill", "--disallowedTools", "Bash,Write,Edit,NotebookEdit",
      "--output-format", "stream-json", "--verbose"],
    parse: (e, run) => {
      if (e.type === "result") run.text = e.result ?? "";
      if (e.type !== "assistant") return;
      for (const c of e.message.content) {
        if (c.type !== "tool_use") continue;
        if (c.name === "Skill") run.skills.add(c.input.skill.split(":").pop());
        else addSkillPaths(run, c.input.file_path);
      }
    },
  },
  pi: {
    cmd: ["pi", "-p", "--mode", "json", "--no-session", "--tools", "read"],
    parse: (e, run) => {
      if (e.type === "tool_execution_start") addSkillPaths(run, e.args?.path);
      if (e.type !== "agent_end") return;
      run.text = e.messages.filter((m: any) => m.role === "assistant").flatMap((m: any) => m.content)
        .filter((c: any) => c.type === "text").map((c: any) => c.text).join("\n");
    },
  },
  codex: {
    cmd: ["codex", "exec", "--json", "-s", "read-only", "--skip-git-repo-check", "--ephemeral"],
    parse: (e, run) => {
      if (e.type !== "item.completed") return;
      if (e.item.type === "command_execution") addSkillPaths(run, e.item.command);
      if (e.item.type === "agent_message") run.text = e.item.text;
    },
  },
};

async function run(agent: Agent, c: Case): Promise<Run> {
  const cwd = mkdtempSync(join(TMP, "case-"));
  const result: Run = { skills: new Set(), text: "" };
  try {
    const proc = Bun.spawn([...agent.cmd, ...extra, c.prompt], { cwd, stdin: "ignore", stdout: "pipe", stderr: "ignore", timeout: TIMEOUT_MS });
    for (const line of (await new Response(proc.stdout).text()).split("\n")) {
      let event;
      try { event = JSON.parse(line); } catch { continue; }
      agent.parse(event, result);
    }
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
  return result;
}

function check(c: Case, r: Run): string[] {
  const missing = (c.skills ?? []).filter(s => !r.skills.has(s)).map(s => `missing ${s}`);
  const unexpected = (c.not_skills ?? []).filter(s => r.skills.has(s)).map(s => `unexpected ${s}`);
  const reply = c.regex && !new RegExp(c.regex, "i").test(r.text) ? [`reply lacks /${c.regex}/`] : [];
  return [...missing, ...unexpected, ...reply];
}

const args = Bun.argv.slice(2);
const sep = args.includes("--") ? args.indexOf("--") : args.length;
const opts = args.slice(0, sep);
const r = opts.findIndex(a => /^--runs(=|$)/.test(a));
const [flag] = r < 0 ? [] : opts.splice(r, 1);
const runs = flag ? Number(flag.split("=")[1] ?? opts.splice(r, 1)[0]) : 1;
// agent defaults to pi, so a lone positional is the filter
const [name, filter = ""] = Object.hasOwn(agents, opts[0]) ? opts : ["pi", ...opts];
const extra = args.slice(sep + 1);
const agent = agents[name];
if (!(runs >= 1)) {
  console.error(`usage: bun evals/run.ts [${Object.keys(agents).join("|")}] [prompt filter] [--runs N] [-- extra agent args]`);
  process.exit(2);
}

mkdirSync(TMP, { recursive: true });
const todo = (cases as Case[]).filter(c => c.prompt.includes(filter));
const jobs = todo.flatMap(c => Array(runs).fill(c));
const done = new Map<Case, { skills: Set<string>; errs: string[] }[]>();
let next = 0, failed = 0;
async function worker() {
  while (next < jobs.length) {
    const c = jobs[next++];
    const r = await run(agent, c);
    const rs = done.get(c) ?? [];
    rs.push({ skills: r.skills, errs: check(c, r) });
    done.set(c, rs);
    if (rs.length < runs) continue;
    const passes = rs.filter(x => !x.errs.length).length;
    if (passes < runs) failed++;
    const skills = new Set(rs.flatMap(x => [...x.skills]));
    const errs = [...new Set(rs.flatMap(x => x.errs))];
    const note = errs.length ? ` — ${errs.join(", ")}` : "";
    const rate = runs > 1 ? ` ${passes}/${runs}` : "";
    console.log(`${passes === runs ? "PASS" : "FAIL"}${rate} [${[...skills].join(",")}] ${c.prompt.slice(0, 70)}${note}`);
  }
}
await Promise.all(Array.from({ length: JOBS }, worker));
console.log(`${todo.length - failed}/${todo.length} passed`);
process.exit(failed ? 1 : 0);
