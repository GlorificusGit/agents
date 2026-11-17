---
tags: [bash]
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Skill, Write, Edit, Bash]
---

need a script api_get.sh that GETs https://api.example.com/v1/items with curl. send headers Authorization: Bearer $TOKEN, Accept: application/json, X-Request-Id (a uuid), User-Agent: inventory-sync/1.0, use a 10s timeout, fail on http errors, and pipe the result through jq to print each item name
