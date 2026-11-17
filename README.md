## Install
```bash
git clone git@github.com:GlorificusGit/agents.git ~/.agents
~/.agents/link.sh
```

## Evals
```bash
evals/run [claude|pi|codex] [filter] [--runs N] [-o DIR]   # evals/cases.yaml in each agent's real setup (default pi)
evals/run claude -- --model haiku --effort low   # args after -- go to the agent
evals/run pi -- --model deepseek/deepseek-flash --thinking low
evals/run pi magic --runs=3 -- --model ollama/qwen3.5:9b --thinking high
claude plugin eval skills/bash --allow-tools Write,Edit,Bash   # skill in isolation
```
