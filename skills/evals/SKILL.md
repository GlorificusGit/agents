---
name: evals
description: Writing agent evals. Use when writing or editing eval cases, prompts or graders (e.g. cases.yaml, prompt.md, graders/*.md, claude plugin eval)
---

# Tools
avoid granting Write, Edit or Bash to the agent under test. most evals can grade the reply text instead.

prefer:
```yaml
allowed_tools: [Read, Glob, Grep, Skill]
```

- ask for the output inline, e.g. end the prompt with "reply with just the script"
- grade the reply, not a file. in `claude plugin eval`, a regex grader with no `target` checks `last_message`
- only grant write/bash tools when the behavior under test needs them, and keep them scoped (e.g. `Bash(git status:*)`)
- drop graders that can't fail without the tool (e.g. "never runs the script" when Bash isn't granted)

# Prompts
- don't mention the home dir (`~/`, `$HOME`, `/home/...`). use paths relative to the cwd
- files and dirs the prompt names but the eval doesn't provide must be marked hypothetical, e.g. "reads a hypothetical hosts.txt"
- don't ask the agent to run or act on something that doesn't exist

# Graders
- regex graders on reply text can match prose ("instead of `while read`..."), so ask for the bare output
- prefer cheap deterministic graders (regex, tool_used) over llm graders
