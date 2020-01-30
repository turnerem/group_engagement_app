# Working with Git as a Team

## PROTECT THE MASTER
We must keep master branch free from questionable code always (PROTECT THE MASTER). We will all work off of branches named after the section we are working on and commit to this branch only (PROTECT THE MASTER). When the time comes to merge our work into the main code base we will merge to a dev branch, set as default branch on git, and *not* the master branch (PROTECT THE MASTER). When the time comes to merge the *dev* to the master (we never merge the *sausage-dog* straight onto the master) we make a 'New pull request' on git, see below, and this must be approved of by another or two (PROTECT THE MASTER).

We must PROTECT THE MASTER in three ways:
  1. set dev to be the default branch.
  2. require approvals before merging to master
  3. git hooks can also prevent a bad push or commit

### Git Hooks:
`npm install husky --save-dev`
E.g.:
```{javascript}
{
  "husky": {
    "hooks": {
      "precommit": "npm t",
      "posttest": "eslint ./ --fix"
    }
  }
}
```
Above example will run spec tests and linting with auto-fixing (where it can) before each commit.

## Best Commit Practices
- do you really need me to write these here?

## Branches
- create branch locally: `git checkout -b sausage-dog`
  - -b is for 'branch'
  - hey what branch am I on?!?! `git branch`
    - this shows all local branches and the branch that you are on. To see all branches on local and git: `git branch -a`. This is handy for checking whether a branch has only been created locally, or is also on git
- ready to add to a branch?
  - `git add niceFileName.py`
  - `git commit -m 'even nicer commit message'`
  - `git push origin sausage-dog`
- ready to add to dev: on git, on sausage-dog branch, click 'New pull request' to make request to pull branch into dev
  - if there are merge conflicts pull code into Node and sort them out
- request a review (PROTECT THE MASTER)
- when review is approved, delete branch so that it doesn't clog up the branch list:
  - delete locally: `git branch -d sausage-dog` (if branch has not yet been merged, an error will show phew)
  - delete remotely: `git push origin --delete sausage-dog`
- on local machine: switch between branches with `git checkout dev`
- other peeps may have updated stuff while you've been out on your branch. Pull down these changes: `git pull origin dev`
- `git fetch`: to see all remote branches. It's kind of like a `git pull`, but for branches

### (aside)Those pesky Untracked files
- you can clean these up if you like.
- to see what would be cleaned: `git clean -n`
- if you're ok with LOSING EVERYTHING LISTED THERE, then: `git clean -f` to remove all files. Soz but it's a different command to delete directories.
