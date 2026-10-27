#!/usr/bin/env bash
set -euo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

mkdir -p "$HOME/.claude" "$HOME/.pi/agent" "$HOME/.codex"

ln -sfn "$repo/skills" "$HOME/.claude/skills"
ln -sfn "$repo/AGENTS.md" "$HOME/.claude/CLAUDE.md"
ln -sfn "$repo/AGENTS.md" "$HOME/.pi/agent/AGENTS.md"
ln -sfn "$repo/AGENTS.md" "$HOME/.codex/AGENTS.md"
