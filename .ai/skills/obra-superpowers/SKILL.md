---
name: obra-superpowers
description: >
  Complete software development methodology for coding agents. Use this skill when
  the user wants to start building something new — triggers brainstorming, planning,
  TDD, subagent-driven development, code review, and branch finishing workflows
  automatically. Based on obra/superpowers by Jesse Vincent.
---

# Superpowers — Complete Development Methodology

Superpowers is a complete software development methodology built on composable skills.
As soon as you see the user is building something, **DO NOT jump straight into code**.
Instead, follow this lifecycle:

## Core Workflow (Mandatory, Run in Order)

### 1. BRAINSTORMING (Before any code)
- Step back and ask what the user is **really** trying to do
- Tease out a proper spec through conversation
- Show the design in short, digestible chunks for validation
- Save the design document before proceeding
- Ask clarifying questions until the design is signed off

### 2. WRITING-PLANS (After design approval)
Write an implementation plan detailed enough that:
- An exact file path is given for every change
- Complete code blocks are provided (no "..." placeholders)
- Each task has a verification/test step
- Tasks are bite-sized: 2–5 minutes each
- Emphasizes true **RED-GREEN-REFACTOR** TDD
- Follows **YAGNI** (You Aren't Gonna Need It)
- Follows **DRY** (Don't Repeat Yourself)

### 3. USING-GIT-WORKTREES (After design approval)
- Create an isolated workspace on a new branch
- Run project setup commands
- Verify a clean test baseline before starting

### 4. SUBAGENT-DRIVEN-DEVELOPMENT (Execute the plan)
- Dispatch a fresh subagent for each engineering task
- Apply a two-stage review for each task:
  1. **Spec compliance** — does it match the plan?
  2. **Code quality** — is the code well-written?
- Continue forward after review passes
- Claude can often work autonomously for hours without deviating from the plan

### 5. TEST-DRIVEN-DEVELOPMENT (During implementation)
**MANDATORY cycle for every feature:**
1. Write the failing test (RED)
2. Watch it fail — confirm it fails for the right reason
3. Write the minimal code to make it pass (GREEN)
4. Watch it pass
5. Commit
6. Refactor if needed (REFACTOR)
7. **Delete any code written before the test**

### 6. REQUESTING-CODE-REVIEW (Between tasks)
- Review the implementation against the plan
- Report issues by severity level
- **Critical issues block progress** until resolved

### 7. FINISHING-A-DEVELOPMENT-BRANCH (When tasks complete)
- Verify all tests pass
- Present options: merge / create PR / keep branch / discard
- Clean up the worktree

---

## Additional Skills (Use When Relevant)

### Debugging
- **systematic-debugging**: 4-phase root cause analysis
  1. Reproduce the bug reliably
  2. Understand the system (read before guessing)
  3. Hypothesize and test (one hypothesis at a time)
  4. Fix and verify
- **verification-before-completion**: Confirm the bug is actually fixed before declaring done

### Collaboration
- **dispatching-parallel-agents**: Run multiple subagents concurrently for independent tasks
- **receiving-code-review**: How to respond to (and act on) review feedback
- **executing-plans**: Batch execution with human checkpoints

---

## Philosophy
- **Test-Driven Development** — Write tests first, always. No exceptions.
- **Systematic over ad-hoc** — Follow the process, don't guess.
- **Complexity reduction** — Simplicity is the primary goal. YAGNI.
- **Evidence over claims** — Verify before declaring success. Don't say "it should work."

---

## Source
obra/superpowers by Jesse Vincent — https://github.com/obra/superpowers  
MIT License
