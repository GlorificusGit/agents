#!/usr/bin/env bash
set -euo pipefail

mkdir -p "$HOME/.pi/agent" "$HOME/.claude" "$HOME/.codex" "$HOME/.gemini/config"

ln -sfn "$HOME/.agents/AGENTS.md" "$HOME/.pi/agent/AGENTS.md"
ln -sfn "$HOME/.agents/AGENTS.md" "$HOME/.claude/AGENTS.md" # works now!
ln -sfn "$HOME/.agents/AGENTS.md" "$HOME/.codex/AGENTS.md"
ln -sfn "$HOME/.agents/AGENTS.md" "$HOME/.gemini/AGENTS.md"

ln -sfn "$HOME/.agents/skills" "$HOME/.claude/skills"
ln -sfn "$HOME/.agents/skills" "$HOME/.gemini/config/skills"
