---
type: regex
pattern: 'while\s+(IFS=\S*\s+)?read\b'
match: not_contains
---

the script does not use a `while read` loop
