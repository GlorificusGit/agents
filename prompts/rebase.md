---
argument-hint: "[parent]"
---
Follow these instructions to rebase this feature branch onto the latest <remote>/${1:-main}:

- Stop if on `${1:-main}` or the working tree is dirty.
- `git fetch <remote>`
- Find <base>: `git merge-base --fork-point <remote>/${1:-main} HEAD || git merge-base <remote>/${1:-main} HEAD`. `--fork-point` handles a parent that was force-pushed since this branch forked. If `git log <base>..HEAD` includes commits not from this branch, stop and ask me.
- Squash to 1 commit: `git reset --soft <base>`, then commit with a message summarizing the squashed commits. Skip if already 1 commit ahead of <base>.
- `git rebase --onto <remote>/${1:-main} HEAD~1`
- Resolve conflicts. If a resolution is ambiguous, stop and ask me.
- Run the project's build/tests, if any.
- `git push --force-with-lease`
- Report any unexpected conflicts
