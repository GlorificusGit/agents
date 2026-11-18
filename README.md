## Install
```bash
git clone git@github.com:GlorificusGit/agents.git ~/.agents
~/.agents/link.sh
```

## Evals

trigger evals and output checking. runs evals/cases.yaml in the agent's real setup
```bash
evals/run [claude|pi|codex] [filter] [--runs N] [-o DIR]
evals/run claude -- --model haiku --effort low
evals/run pi -- --model deepseek/deepseek-flash --thinking low
evals/run pi magic --runs=3 -- --model ollama/qwen3.5:9b --thinking high
```

skill evals in isolation
```bash
claude plugin eval skills/bash --model haiku  # no --effort flag
```
