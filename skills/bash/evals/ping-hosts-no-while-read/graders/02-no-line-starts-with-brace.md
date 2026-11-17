---
type: regex
target: {source: file, path: ping_hosts.sh}
pattern: '^\s*\{'
flags: m
match: not_contains
---

ping_hosts.sh has no line starting with `{`
