---
tags: [bash]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

make a backup.sh that creates ~/backups if it does not exist, rsyncs ~/docs into a dated subfolder like ~/backups/2026-11-17, and exits with an error message if rsync fails
