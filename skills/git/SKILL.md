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
When talking about specific pull requests to the user, include their date.

if gh is authenticated using a fine-grained personal access token, you may not be able to see PR CI checks.
you can use the following command to view PR info without the CI checks:
```sh
gh pr view <pr-number> --json number,title,url,state,isDraft,author,createdAt,updatedAt,baseRefName,headRefName,mergeable,mergeStateStatus,reviewDecision,reviewRequests,latestReviews,labels,additions,deletions,files,commits,comments,body
```

# SSH key passphrases
IMPORTANT! If you EVER see an error mentioning 'ssh_askpass', you need to ask the user to load it for you.
If you see 'Permission denied (publickey)' without seeing 'ssh_askpass', it might still a passphrase issue as well.
DO NOT retry with another key. You (not the user) must check git config for the specific SSH key with this command:
```sh
git config core.sshCommand
```
If you find a SSH keyfile name from that command, then immediately prompt the user to run:
```sh
ssh-add <key>
```
