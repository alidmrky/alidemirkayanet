---
name: garrytan-gstack
description: >
  Virtual engineering team workflow system. Use this skill when the user asks to
  plan, build, review, test, or ship a product feature. Provides structured roles
  (CEO, Eng Manager, Designer, QA Lead, Security Officer, Release Engineer) and
  slash-command-style workflows for the full development sprint lifecycle.
  Based on garrytan/gstack by Garry Tan (YC CEO).
---

# GStack — Virtual Engineering Team

GStack turns your AI assistant into a **virtual engineering team** with specialized
roles running in a structured sprint process:

**Think → Plan → Build → Review → Test → Ship → Reflect**

---

## Available Workflows (Slash Commands)

### 🧠 THINK PHASE

#### `/office-hours` — YC Office Hours
**Use this first.** Six forcing questions that reframe the product before writing code.

Process:
1. Ask about the **pain** — specific examples, not hypotheticals
2. Push back on the framing — what are you **actually** building?
3. Extract capabilities the user didn't realize they were describing
4. Challenge premises — agree, disagree, or adjust
5. Generate 3 implementation approaches with effort estimates
6. **Recommend the narrowest wedge to ship tomorrow**

Output: Design document (feeds into all downstream workflows)

#### `/plan-ceo-review` — CEO / Strategic Review
Four modes:
- **Expansion**: What's the 10-star product hiding in this request?
- **Selective Expansion**: Expand specific dimensions only
- **Hold Scope**: Validate plan as-is
- **Reduction**: Cut to ship the fastest possible version

#### `/plan-eng-review` — Engineering Manager Review
- ASCII diagrams for data flow and state machines
- Error paths and edge cases
- Test matrix
- Security concerns
- Forces hidden assumptions into the open

#### `/plan-design-review` — Senior Designer Review
- Rates each design dimension 0–10
- Explains what a 10 looks like for this context
- Edits the plan to improve each dimension
- Interactive: one decision per design choice
- Detects "AI slop" aesthetics

#### `/plan-devex-review` — Developer Experience Review
- Explores developer personas
- Benchmarks TTHW (Time to Hello World) against competitors
- Designs the "magical first moment"
- Traces friction step by step
- Outputs: DX EXPANSION / DX POLISH / DX TRIAGE recommendations

#### `/autoplan` — Full Review Pipeline (One Command)
Runs CEO → Design → Engineering review automatically.
Surfaces only **taste decisions** for your approval.

---

### 🔨 BUILD PHASE

After plan is approved, implement. Then run:

#### `/review` — Staff Engineer Code Review
Find bugs that pass CI but blow up in production:
- Auto-fixes obvious issues
- Flags completeness gaps
- **Race conditions, memory leaks, unhandled edge cases**

#### `/investigate` — Systematic Debugger
Iron Law: **No fixes without investigation.**

Process:
1. Reproduce the bug reliably
2. Trace the data flow
3. Test one hypothesis at a time
4. Stop after 3 failed fixes and re-investigate

---

### 🎨 DESIGN PHASE

#### `/design-consultation` — Design Partner
Build a complete design system from scratch:
- Research the design landscape
- Propose creative risks
- Generate realistic product mockups
- Output: `DESIGN.md`

#### `/design-shotgun` — Visual Explorer
Generate 4–6 design variants → show comparison board → collect feedback → iterate.
Taste memory learns what you prefer across rounds.

#### `/design-html` — Design to Production HTML
Turn an approved mockup into production-quality HTML/CSS:
- Text reflows on resize
- Heights adjust to content
- Dynamic layouts
- Zero dependencies
- Detects React/Svelte/Vue and outputs the right format

#### `/design-review` — Live Design Audit
Same audit as `/plan-design-review`, but applied to existing live code.
Makes atomic commits with before/after screenshots.

---

### 🧪 TEST PHASE

#### `/qa` — QA Lead (with Browser)
- Open a real browser
- Click through user flows
- Find bugs
- Fix them with atomic commits
- Auto-generate regression tests for every fix
- Re-verify fixes

#### `/qa-only` — QA Reporter (No Changes)
Same methodology as `/qa` but **report only**.
Pure bug report without code changes.

---

### 🔒 SECURITY PHASE

#### `/cso` — Chief Security Officer
- OWASP Top 10 audit
- STRIDE threat model
- Zero noise: 17 false positive exclusions
- ≥ 8/10 confidence gate
- Each finding includes a **concrete exploit scenario**

---

### 🚀 SHIP PHASE

#### `/ship` — Release Engineer
1. Sync main branch
2. Run all tests
3. Audit coverage
4. Push
5. Open PR
6. Bootstrap test framework if missing

#### `/land-and-deploy` — Merge to Production
Merge PR → wait for CI → wait for deploy → verify production health.
One command from "approved" to "verified in production."

#### `/canary` — Post-Deploy Monitor (SRE)
Watch for console errors, performance regressions, and page failures after deploy.

---

### 📊 REFLECT PHASE

#### `/retro` — Engineering Retrospective
Weekly retro with:
- Per-person breakdowns
- Shipping streaks
- Test health trends
- Growth opportunities

---

### 🛠 POWER TOOLS

| Command | What it does |
|---------|-------------|
| `/benchmark` | Baseline page load times and Core Web Vitals. Compare before/after. |
| `/document-release` | Update all docs to match what just shipped. Catches stale READMEs. |
| `/careful` | Safety guardrails — warns before `rm -rf`, `DROP TABLE`, force-push |
| `/freeze` | Lock edits to one directory while debugging |
| `/guard` | `/careful` + `/freeze` together |
| `/unfreeze` | Remove the freeze boundary |
| `/browse` | Real Chromium browser, real clicks, real screenshots |
| `/learn` | Manage what gstack learned. Review, search, prune, export patterns. |

---

## Sprint Philosophy

> "Without a process, ten agents is ten sources of chaos.
> With a process — Think, Plan, Build, Review, Test, Ship — each agent
> knows exactly what to do and when to stop."

### Which Review to Use?

| Building for... | Before code | After shipping |
|-----------------|-------------|----------------|
| End users (UI / web app) | `/plan-design-review` | `/design-review` |
| Developers (API / CLI / SDK) | `/plan-devex-review` | `/devex-review` |
| Architecture (data flow, perf) | `/plan-eng-review` | `/review` |
| All of the above | `/autoplan` | — |

---

## Parallel Sprints Model

> "gstack is powerful with one sprint. It is transformative with ten running at once."

Each sprint runs independently:
1. `/office-hours` on a new idea
2. `/review` on an open PR
3. Implementation on another branch
4. `/qa` on staging
5. ...and so on

You manage them as a CEO: check in on decisions that matter, let the rest run.

---

## Source
garrytan/gstack by Garry Tan (Y Combinator CEO)  
https://github.com/garrytan/gstack  
Free, MIT licensed, open source.
