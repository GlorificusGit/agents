## Install
```bash
git clone git@github.com:GlorificusGit/agents.git ~/.agents
~/.agents/link.sh
```

## Evals
```bash
bun evals/run.ts [claude|pi|codex] [filter] [--runs N]   # evals/cases.yaml in each agent's real setup (default pi)
bun evals/run.ts claude -- --model haiku --effort low   # args after -- go to the agent
bun evals/run.ts pi -- --model deepseek/deepseek-flash --thinking low
bun evals/run.ts pi secret --runs=3 -- --model ollama/qwen3.5:9b --thinking high
claude plugin eval skills/bash --allow-tools Write,Edit,Bash   # skill in isolation
```
