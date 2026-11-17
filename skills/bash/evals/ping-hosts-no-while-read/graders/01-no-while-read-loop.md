---
type: regex
target: {source: file, path: ping_hosts.sh}
pattern: 'while\s+(IFS=\S*\s+)?read\b'
match: not_contains
---

ping_hosts.sh does not use a `while read` loop
