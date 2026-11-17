---
type: regex
target: {source: file, path: backup.sh}
pattern: '\|\|\s*\{'
match: not_contains
---

backup.sh has no `|| {` blocks
