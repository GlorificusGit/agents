---
name: git
description: Git and GitHub conventions. Use when cloning, pushing, browsing repos, creating repos, or opening PRs.
---

# Auth
Always use SSH for git, never HTTP(S).

```sh
git clone git@github.com:owner/repo.git   # good
git clone https://github.com/owner/repo.git # bad
```

If a remote is HTTP, switch it: `git remote set-url origin git@github.com:owner/repo.git`.

# gh cli
`gh` is available. Use it for GitHub work instead of hand-rolling API calls.

```sh
gh repo view owner/repo            # browse / read repo info
gh repo clone owner/repo           # clones over SSH if configured
gh repo create <name> --private    # create repo
gh pr create                       # open a PR
gh pr view / gh pr list            # inspect PRs
gh issue view / gh issue list      # inspect issues
```

If gh needs auth or an SSH key passphrase, stop and ask the user rather than switching to HTTPS.
