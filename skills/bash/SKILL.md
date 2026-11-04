---
name: bash
description: Bash scripting conventions. Use when writing or editing shell scripts
---
first, read /skill:coding

after writing a script, don't assume you should run it

# Bash if statements:

avoid:
```
[[ a != b ]] || {
  something
}
```

prefer:
```
if [[ a == b ]]; then
  something
fi
```
or
```
[[ a == b ]] && something
```

avoid starting lines with '{'

avoid: while read -r

avoid: \
