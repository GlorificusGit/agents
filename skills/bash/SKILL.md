---
name: bash
description: Bash coding conventions. Writing or editing shell scripts
---

FIRST load skill /coding [`coding`](../coding/SKILL.md)

after writing a script, don't assume you should run it

# Bash if statements:

avoid:
```bash
[[ a != b ]] || {
  something
}
```

prefer:
```bash
if [[ a == b ]]; then
  something
fi
```
or
```bash
[[ a == b ]] && something
```

avoid starting lines with '{'

avoid: while read -r

avoid: \
