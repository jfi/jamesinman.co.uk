---
layout: post
title: "Stop 1Password SSH Prompts Breaking Your AI Coding Workflow"
date: 2026-03-10
reading_time: 3
published: false
tags:
  - opensource
---

If you use 1Password's SSH agent alongside AI coding tools like Claude Code, you've probably hit this: every `git push`, `gh pr create`, or SSH command triggers a fresh approval prompt. With AI assistants routinely running 10–20+ git commands per task, each one requiring Touch ID or a password, the workflow becomes unusable.

The obvious fix — setting "Remember key approval" to "until 1Password quits" — doesn't actually help. Here's why, and what to do instead.

## The counterintuitive fix

Change "Remember key approval" to **"until 1Password locks"** (not "until 1Password quits").

This isn't just a different duration — it's a different authorisation path. The "until 1Password locks" option uses an approval mechanism that **supports background suppression**, meaning subprocess SSH requests are silently approved without a popup. The "until 1Password quits" option uses a prompt type that doesn't support background suppression, so every new process triggers a fresh prompt regardless.

## Complementary security settings

To make this work well in practice:

1. Set **"Lock after the device is idle for"** to **Never** (or a long duration like 8 hours)
2. Keep **"Lock when device locks or sleeps"** enabled — this is your actual security boundary

The result: approve once when you start working, then silently approved until your Mac sleeps or locks. Your security boundary is the device lock, not an arbitrary idle timer.

## Why this matters

The difference is between approving once per session versus approving every single command. AI coding assistants are fundamentally built around running sequences of commands as background subprocesses — and 1Password's default SSH agent settings weren't designed with this pattern in mind.

If you've been fighting with constant SSH prompts every time Claude Code pushes a branch or creates a PR, this one settings change will fix it.

## Source

This solution came from a [1Password community discussion](https://www.1password.community/discussions/developers/what-is-the-best-way-to-keep-the-ssh-agent-responding-to-background-requests/145469) on keeping the SSH agent responsive to background requests.
