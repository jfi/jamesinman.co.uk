---
layout: post
title: "Parallel Claude Code Sessions Without the Git Worktree Pain"
date: 2026-03-21
reading_time: 7
published: false
tags:
  - ai
  - opensource
---

One of the most powerful things about Claude Code is running multiple sessions in parallel — one implementing a feature, another fixing a bug, a third refactoring tests. But if you've tried this with git worktrees, you've probably hit the wall: corrupted `.claude/` directories, fragmented conversation memory, skills that stop working, and mysterious behaviour regressions.

The fix isn't a better worktree setup. It's replacing git's local workflow entirely with [Jujutsu](https://github.com/jj-vcs/jj) (jj), a modern version control system that was built for exactly this kind of parallel work.

## The problem with git worktrees

Claude Code has built-in worktree support (`claude --worktree feature-name`), which creates isolated working directories under `.claude/worktrees/`. In theory, each session gets its own branch and working copy. In practice, there are several open issues that make this unreliable:

**The `.claude/` directory fragments.** Each worktree only gets `settings.local.json` — your custom skills, agents, settings, and rules don't come along. So Claude sessions in worktrees can't use any of the tooling you've carefully set up.

**Project memory splits.** Each worktree path gets its own entry in `~/.claude/projects/`, which means conversation history and auto-memory (the things Claude learns about your project over time) diverge across sessions. Session 2 can't benefit from what Session 1 just learned.

**Model behaviour degrades.** There are reports of Claude systematically failing to follow workflows, invoke skills, or dispatch sub-agents when running inside a worktree — behaviour that never occurs in the main working copy.

These aren't edge cases. They make parallel worktree sessions genuinely less capable than single sessions, which defeats the purpose.

## Why Jujutsu fixes this

Jujutsu takes a fundamentally different approach to parallel work. Instead of creating physical copies of your repository (which is what git worktrees do), jj manages multiple concurrent changes within a single working directory.

The key differences:

- **One directory, many changes.** Your working directory stays in one place. jj tracks multiple parallel revisions in its commit graph. You switch between them with `jj edit`, and jj swaps the file contents.
- **No staging area.** Every file change is automatically captured in the current revision. Nothing gets lost because you forgot to `git add`.
- **Everything is reversible.** `jj undo` works for nearly any operation — rebases, squashes, description changes. Git's reflog exists but is painful to use; jj makes undo a first-class operation.
- **Automatic rebasing.** When you change a parent commit, all descendants automatically rebase. Stacked PRs become trivial.

Because you're working in one directory, Claude Code's `.claude/` directory stays intact. All your skills, agents, memory, and settings work in every session. There's no fragmentation.

## Setting it up

Install jj (it's a single binary):

```bash
brew install jj
```

Initialise it in your existing git repo in colocated mode — this keeps your `.git/` directory intact so GitHub, CI, pre-commit hooks, and everything else continues working:

```bash
cd your-project
jj git init --colocate
```

Configure your identity:

```bash
jj config set --user user.name "Your Name"
jj config set --user user.email "you@example.com"
```

Track your main branch:

```bash
jj bookmark track main --remote=origin
```

Add `.jj/` to your `.gitignore`:

```
# Jujutsu VCS (colocated with git)
.jj/
```

That's it. Your git history is fully imported, and you can use jj and git interchangeably.

## Sequential vs simultaneous parallel work

There's an important distinction to make: **switching between tasks** (sequential) and **running multiple agents at the same time** (simultaneous). jj handles both, but they need different approaches.

### Sequential: `jj edit`

If you're working on one thing at a time but want to quickly context-switch, `jj edit` is perfect:

```bash
# Start a feature
jj new main -m "feature: add gift aid tracking"
claude

# Later, switch to a bug fix (jj snapshots your feature work automatically)
jj new main -m "fix: organisation search timeout"
claude

# Switch back to the feature
jj edit <feature-change-id>
```

This works because only one session is touching the working directory at a time.

### Simultaneous: `jj workspace add`

If you want multiple Claude sessions running at the same time — say one implementing a feature while another writes tests — you need **separate working directories**. jj handles this with workspaces:

```bash
# Terminal 1 — feature work in an isolated workspace
jj workspace add ~/Projects/myapp-workspaces/gift-aid --name gift-aid
cd ~/Projects/myapp-workspaces/gift-aid
jj new main -m "feature: add gift aid tracking"
claude

# Terminal 2 — bug fix in another isolated workspace
jj workspace add ~/Projects/myapp-workspaces/search-fix --name search-fix
cd ~/Projects/myapp-workspaces/search-fix
jj new main -m "fix: organisation search timeout"
claude
```

Each workspace gets its own directory with its own working copy, but they share the same revision graph and repository history. When you're done:

```bash
# From within the workspace, create bookmark and push
jj bookmark create feature/gift-aid -r @
jj git push --bookmark feature/gift-aid

# Clean up
jj workspace forget gift-aid
rm -rf ~/Projects/myapp-workspaces/gift-aid
```

**Why not just use `jj edit` for simultaneous work?** Because jj auto-tracks all file changes in the working directory. If two agents are writing files at the same time in the same directory, their changes leak into each other's revisions. I learned this the hard way — one agent's `jj restore` wiped out another agent's newly created files, and a third agent's unrelated changes silently merged into my feature branch. Workspaces solve this completely.

### Common workflow for PRs

Whether you used `jj edit` or `jj workspace add`, pushing to GitHub is the same:

```bash
# Describe the change
jj describe -m "Add Gift Aid tracking with HMRC API integration"

# Create a bookmark (jj's term for a branch) for the PR
jj bookmark create feature/gift-aid -r @

# Push to GitHub
jj git push --bookmark feature/gift-aid
```

## The key mental model shift

In git, your working directory *is* your branch. Switching branches means physically changing files. That's why worktrees exist — to have multiple physical copies so you don't lose context.

In jj, your working directory is just a view into whichever revision you're currently editing. The revisions themselves live in jj's internal storage. Switching is fast and lossless — jj snapshots your current state before switching, so nothing is ever lost.

For sequential work, this means you can use `jj edit` to swap between tasks without losing anything — no worktrees needed. For simultaneous work (multiple AI agents at once), `jj workspace add` gives you separate directories that share the same history, which is cleaner than git worktrees because the `.claude/` directory and project memory stay in one place.

This is why jj is such a natural fit for AI coding assistants. Claude Code generates files and changes; jj captures them automatically. For sequential work, a single directory with `jj edit` is enough. For simultaneous agents, `jj workspace add` gives each one an isolated working copy without the fragmentation problems of git worktrees.

## What you keep from git

Because jj runs in colocated mode, you lose nothing:

- **GitHub PRs, CI, Actions** — all work exactly as before
- **Pre-commit hooks** (Lefthook, Husky, etc.) — still run on commit
- **Git blame, log, bisect** — still available via `git` commands
- **Collaborators** — they don't need to use jj; your pushes create normal git branches

jj is a local workflow improvement. It doesn't change how your code reaches GitHub or how others interact with it.

## Getting Claude Code to use jj

Add jj instructions to your project's `CLAUDE.md` so Claude knows to use jj commands instead of git for local operations:

```markdown
### Version Control (jj + git)

This repo uses Jujutsu (jj) colocated with git. Use jj for local work;
git remains for GitHub integration.

- Use `jj new main` to start new work
- Use `jj describe` to set commit messages
- Use `jj bookmark create` + `jj git push` for PRs
- Use `jj edit <change-id>` to switch between changes
- No staging needed — all changes are automatically tracked
- For parallel agents: use `jj workspace add` to create isolated
  working directories before starting feature work
```

## Fixing 1Password CLI timeouts

If you use [1Password CLI plugins](https://developer.1password.com/docs/cli/shell-plugins/) to manage your GitHub credentials, you'll hit a wall with Claude Code. The plugin wraps `gh` with an alias:

```bash
alias gh="op plugin run -- gh"
```

Every `gh` call now routes through 1Password, which blocks waiting for biometric unlock. In an interactive terminal that's fine — you touch the fingerprint reader and move on. But Claude Code runs `gh` commands non-interactively, so they just hang until the authorization times out.

The fix is two steps. First, give `gh` its own stored credential so it doesn't need 1Password:

```bash
gh auth login -h github.com -p ssh -w
```

Then, conditionally skip the 1Password plugin in Claude Code sessions. Claude Code sets `CLAUDECODE=1` in its environment, so you can use that as a guard. In whatever file sources the plugin (for me it was `~/.zshrc.local`):

```bash
# 1Password CLI plugins (skip in Claude Code sessions to avoid auth timeouts)
[[ -z "$CLAUDECODE" ]] && source ~/.config/op/plugins.sh
```

Your normal terminal sessions still get 1Password-managed credentials. Claude Code sessions use the stored `gh` token and never block on biometrics.

## Is it stable?

jj has been in active development since 2022 (originally a Google project) and hit 0.39 as of March 2026. It's colocated mode is mature and well-tested — your git repository is always the source of truth, and you can stop using jj at any time by deleting the `.jj/` directory.

The main thing to be aware of: jj uses different terminology. Branches are "bookmarks". Commits are "revisions" or "changes". The staging area doesn't exist. Once you internalise these differences (which takes about a day), the workflow becomes very natural.

If you're running multiple Claude Code sessions and fighting with worktree corruption, give jj a try. It solves the problem at the right layer — by making parallel work a first-class concept in version control, rather than bolting it on with filesystem copies.
