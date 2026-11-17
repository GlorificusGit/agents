---
type: regex
target: {source: file, path: api_get.sh}
pattern: '\\\s*$'
flags: m
match: not_contains
---

api_get.sh has no lines ending in a backslash continuation
