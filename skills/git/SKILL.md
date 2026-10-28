---
name: git
description: Git and GitHub usage. Use when in a git repo or directory with .git
---

# Auth
Always use SSH for git, never HTTP(S).

```sh
git clone git@github.com:owner/repo.git   # good
git clone https://github.com/owner/repo.git # bad
```

If a remote is HTTP, switch it: `git remote set-url origin git@github.com:owner/repo.git`.

# gh cli
`gh` is available.

If your gh auth seems insufficient, ask the user, do not try to work around it.

# SSH key passphrases
IMPORTANT! If you EVER see an error mentioning 'ssh_askpass', you need to ask the user to load it for you.
DO NOT retry with another key. You (not the user) must check git config for the specific SSH key with this command:
```sh
git config core.sshCommand
```
Then immediately prompt the user to run:
```sh
ssh-add <key>
```

