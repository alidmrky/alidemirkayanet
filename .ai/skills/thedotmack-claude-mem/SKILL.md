---
name: thedotmack-claude-mem
description: >
  Persistent memory system for AI coding sessions. Use this skill to capture,
  compress, and recall important observations from coding sessions — architectural
  decisions, bug fixes, implementation patterns, and project-specific conventions.
  Enables continuity of knowledge across sessions. Based on thedotmack/claude-mem.
---

# Claude-Mem — Persistent Memory System

Claude-Mem preserves context across sessions by automatically capturing observations,
generating semantic summaries, and making them available to future sessions.

---

## Core Workflow

### 1. CAPTURE — Record Important Observations
At the end of every significant action or session, identify and record:

**What to capture:**
- Architectural decisions and the reasoning behind them
- Bug fixes — what was broken, why, and how it was fixed
- API patterns and conventions specific to this project
- "Gotchas" — things that look one way but work another
- File structure decisions
- Dependencies added and why
- Performance considerations discovered
- Test patterns established

**What NOT to capture:**
- Generic knowledge (e.g., "React uses hooks")
- Temporary debugging steps
- Information easily found in documentation

### 2. COMPRESS — Semantic Summarization
When capturing an observation, distill it to the **minimum information needed**
to understand and apply it in a future session:

**Format for observations:**
```
[CATEGORY] Brief title
Context: Why this was done / what problem it solves
Decision: What was decided or discovered
Detail: Any non-obvious implementation specifics
Impact: Files / areas affected
```

**Categories:**
- `[ARCH]` — Architectural decisions
- `[BUG]` — Bug found and fixed
- `[PATTERN]` — Coding pattern established
- `[CONFIG]` — Configuration discovery
- `[GOTCHA]` — Non-obvious behavior
- `[CONVENTION]` — Naming / style convention for this project
- `[PERF]` — Performance insight

### 3. INJECT — Load Context at Session Start
At the start of a new session on a known project:
1. Ask: "What should I know about this project?"
2. Recall relevant observations based on the current task
3. Brief the user on what was remembered and what was not

---

## Memory Management Commands

### Adding a Memory
When you make an important discovery or decision, say:

> "Remembering: [CATEGORY] [observation in compressed format]"

Then store it in the project's memory file (see below).

### Searching Memories
When starting a task, search for relevant memories:

> "Let me check what we've established about [topic]..."

### Pruning Memories
Periodically review stored memories and remove:
- Outdated information (e.g., APIs that were refactored)
- Redundant entries
- Memories that are now in the codebase documentation

---

## Memory Storage Format

Store project memories in `.claude-mem/memories.md` at the project root:

```markdown
# Project Memory — [Project Name]

## Architecture
- [ARCH] ...

## Patterns
- [PATTERN] ...

## Gotchas
- [GOTCHA] ...

## Bug History
- [BUG] ...

## Conventions
- [CONVENTION] ...
```

---

## Session Start Checklist

When beginning work on a project:

1. **Check for memory file**: Does `.claude-mem/memories.md` exist?
2. **Load relevant memories**: Based on the task, surface the 3–5 most relevant observations
3. **Brief the user**: "Based on past sessions, I know that..."
4. **Ask for corrections**: "Is any of this outdated?"

---

## Session End Checklist

Before ending a session:

1. **Review what was done**: What decisions were made? What bugs were fixed?
2. **Identify memorable observations**: What would be useful to know next time?
3. **Compress and store**: Write these to `.claude-mem/memories.md`
4. **Confirm with user**: "I've recorded X observations from this session."

---

## Anti-Patterns to Avoid

- **Over-capturing**: Storing everything creates noise. Be selective.
- **Under-compressing**: Long observations lose value. Distill ruthlessly.
- **Stale memories**: Remove or update outdated information immediately when discovered.
- **Generic observations**: If it's in a README or docs, don't memorize it.

---

## Source
thedotmack/claude-mem — Persistent Memory Compression System for Claude Code  
https://github.com/thedotmack/claude-mem  
MIT License
