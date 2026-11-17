---
type: regex
target: {source: file, path: backup.sh}
pattern: '^\s*\{'
flags: m
match: not_contains
---

backup.sh has no line starting with `{`
