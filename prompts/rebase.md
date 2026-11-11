Follow these instructions to rebase this feature branch onto the latest <remote>/main:

- Stop if on `main` or the working tree is dirty.
- `git fetch <remote>`
- Squash to 1 commit: `git reset --soft $(git merge-base <remote>/main HEAD)`, then commit with a message summarizing the squashed commits. Skip if already 1 commit ahead.
- `git rebase <remote>/main`
- Resolve conflicts. If a resolution is ambiguous, stop and ask me.
- Run the project's build/tests, if any.
- `git push --force-with-lease`
- Report any unexpected conflicts
