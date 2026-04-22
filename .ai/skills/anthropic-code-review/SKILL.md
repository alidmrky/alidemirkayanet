---
name: anthropic-code-review
description: >
  Perform automated, multi-agent code review on a pull request. Use this skill when
  the user asks for a code review, PR review, or wants to check their changes before
  merging. Launches parallel specialized agents with confidence scoring to filter
  false positives. Based on the official Anthropic/Code-Review plugin for Claude Code.
---

# Code Review — Multi-Agent PR Analysis

Automated code review for pull requests using multiple specialized agents with
confidence-based scoring to filter out false positives.

## Usage
```
/code-review [--comment]
```
- Without `--comment`: outputs the review to the terminal only
- With `--comment`: posts the review as an inline comment on the PR

---

## Review Workflow (Follow Exactly)

### Step 1: Pre-Flight Check
Launch an agent to check if review should be **skipped**. Skip if any is true:
- PR is closed
- PR is a draft
- PR is trivial / automated (and obviously correct)
- Claude has already commented on this PR

> Note: Still review Claude-generated PRs.

### Step 2: Gather Context
Launch an agent to return a list of **file paths** (not contents) for all
relevant `CLAUDE.md` / project rule files, including:
- Root-level guideline file
- Any guideline files in directories containing changed files

### Step 3: Summarize Changes
Launch a Sonnet agent to view the PR and return a **summary of changes**.

### Step 4: Launch 4 Parallel Review Agents

**Agents 1 & 2 — Guideline Compliance (run in parallel)**  
Audit changes for compliance with project rules.  
When evaluating a file, only consider rule files that share a path with the file or its parents.

**Agent 3 — Bug Detection**  
Scan for obvious bugs. Focus on the diff only (no extra context).  
Flag only **significant bugs**; ignore nitpicks and probable false positives.  
Do not flag anything that requires context outside the git diff to validate.

**Agent 4 — Logic & Security Analysis**  
Look for problems in the introduced code: security issues, incorrect logic, etc.  
Only look within the changed code.

### ⚠️ CRITICAL: HIGH SIGNAL ONLY

**Flag issues where:**
- Code will fail to compile or parse (syntax errors, type errors, missing imports)
- Code will definitely produce wrong results regardless of inputs (clear logic errors)
- Clear, unambiguous rule violations where you can quote the exact rule being broken

**DO NOT flag:**
- Code style or quality concerns
- Potential issues that depend on specific inputs or state
- Subjective suggestions or improvements
- False positives erode trust and waste reviewer time

### Step 5: Validate Each Issue (Parallel Subagents)
For each issue found by Agents 3 and 4, launch a parallel validation subagent:
- Provide PR title, description, and the issue description
- The agent's job: **verify the issue is truly real with high confidence**
  - Example: if "variable is not defined" was flagged, verify it's actually undefined in the code
- Use Opus agents for bugs and logic issues
- Use Sonnet agents for guideline violations

### Step 6: Filter
Remove any issue that was **not validated** in Step 5.
This is your final list of high-signal issues.

### Step 7: Output
- If issues found: list each with brief description
- If no issues: state `"No issues found. Checked for bugs and guideline compliance."`
- If `--comment` not provided: **stop here**. Do not post any GitHub comments.

### Step 8 (only if `--comment` and issues exist): Post Inline Comments
Post one comment per unique issue using the GitHub inline comment API.
- Provide a brief description of the issue
- For small, self-contained fixes: include a committable suggestion block
- For larger fixes (6+ lines, structural changes, multi-location): describe without a suggestion block
- **Never post a committable suggestion unless committing it fully fixes the issue**
- **IMPORTANT: Only ONE comment per unique issue. No duplicates.**

---

## Confidence Scoring Reference

| Score | Meaning |
|-------|---------|
| 0 | Not confident — false positive |
| 25 | Somewhat confident — might be real |
| 50 | Moderately confident — real but minor |
| 75 | Highly confident — real and important |
| 100 | Absolutely certain — definitely real |

**Threshold: Only issues scoring ≥ 80 proceed to posting.**

---

## False Positives — Always Filter These Out
- Pre-existing issues not introduced in this PR
- Code that looks like a bug but is actually correct
- Pedantic nitpicks a senior engineer would not flag
- Issues a linter will catch (do not run the linter to verify)
- General code quality concerns unless explicitly in project rules
- Issues with lint-ignore comments

---

## Code Link Format (GitHub)
```
https://github.com/owner/repo/blob/[FULL-SHA]/path/to/file.ts#L10-L15
```
- Must use **full SHA** (not abbreviated)
- Line range with `#L` notation
- Provide at least 1 line of context before and after the issue

---

## Source
Anthropic/Code-Review plugin for Claude Code  
https://github.com/anthropics/claude-code/tree/main/plugins/code-review  
Author: Boris Cherny (boris@anthropic.com) — MIT License
