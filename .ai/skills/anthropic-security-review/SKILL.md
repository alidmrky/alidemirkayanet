---
name: anthropic-security-review
description: >
  Perform a security review of code being written or reviewed. Use this skill when
  the user is working with sensitive file patterns, dangerous APIs, or asks for a
  security audit. Automatically detects and warns about common vulnerability patterns
  including injection, XSS, unsafe deserialization, and command injection.
  Based on the official Anthropic/Security-Guidance plugin for Claude Code.
---

# Security Review — Vulnerability Pattern Detection

This skill performs proactive security review, warning about dangerous patterns
as code is written or reviewed. It is also used for on-demand security audits.

---

## Automatic Warning Patterns

Whenever you edit or write code, check for these patterns and **warn before proceeding**:

### 1. GitHub Actions Workflow Injection
**Trigger**: Editing `.github/workflows/*.yml` or `.github/workflows/*.yaml`

**Risk**: Command injection via untrusted GitHub event inputs

**UNSAFE pattern to avoid:**
```yaml
run: echo "${{ github.event.issue.title }}"
```

**SAFE pattern:**
```yaml
env:
  TITLE: ${{ github.event.issue.title }}
run: echo "$TITLE"
```

**Risky inputs to be careful with:**
- `github.event.issue.title` / `.body`
- `github.event.pull_request.title` / `.body`
- `github.event.comment.body`
- `github.event.review.body` / `.review_comment.body`
- `github.event.commits.*.message`
- `github.event.head_commit.message`
- `github.event.head_commit.author.email` / `.name`
- `github.event.pull_request.head.ref` / `.label`
- `github.head_ref`

[Reference: GitHub Security Advisory](https://github.blog/security/vulnerability-research/how-to-catch-github-actions-workflow-injections-before-attackers-do/)

---

### 2. Command Injection — child_process.exec
**Trigger**: `child_process.exec`, `exec(`, `execSync(`

**Risk**: Shell injection if user input is interpolated

**UNSAFE:**
```js
exec(`command ${userInput}`)
```

**SAFE:**
```js
import { execFileNoThrow } from '../utils/execFileNoThrow.js'
await execFileNoThrow('command', [userInput])
```

`execFile` vs `exec`: execFile does **not** spawn a shell, so shell metacharacters in arguments are not interpreted.

---

### 3. Code Injection — new Function()
**Trigger**: `new Function`

**Risk**: Arbitrary code execution from dynamic strings

**Warning**: Only use `new Function()` if you truly need to evaluate arbitrary dynamic code. Consider alternative patterns first.

---

### 4. Eval Injection
**Trigger**: `eval(`

**Risk**: Arbitrary code execution

**Alternatives**:
- `JSON.parse()` for data parsing
- Alternative design patterns that don't require code evaluation

---

### 5. XSS — React dangerouslySetInnerHTML
**Trigger**: `dangerouslySetInnerHTML`

**Risk**: XSS if used with untrusted content

**Mitigation**: Sanitize all content with `DOMPurify` or equivalent before passing to `dangerouslySetInnerHTML`.

---

### 6. XSS — document.write
**Trigger**: `document.write`

**Risk**: XSS attack vector + performance issues

**Alternative**: Use `createElement()` and `appendChild()`.

---

### 7. XSS — innerHTML
**Trigger**: `.innerHTML =`, `.innerHTML=`

**Risk**: XSS with untrusted content

**Alternatives**:
- `textContent` for plain text
- `DOMPurify.sanitize()` before setting innerHTML

---

### 8. Unsafe Deserialization — Python pickle
**Trigger**: `pickle` (Python)

**Risk**: Arbitrary code execution when deserializing untrusted data

**Alternative**: Use `json` or another safe serialization format. Only use pickle if explicitly required.

---

### 9. OS Command Injection — os.system
**Trigger**: `os.system`, `from os import system` (Python)

**Risk**: Shell injection

**Rule**: Only use with **static arguments** — never with user-controlled input.

---

## On-Demand Security Audit

When the user asks for a security review of their codebase, check for all of the above,
plus the **OWASP Top 10**:

1. **Broken Access Control** — Check authorization on every route/endpoint
2. **Cryptographic Failures** — No hardcoded keys, use strong algorithms, encrypt sensitive data
3. **Injection** — SQL injection, command injection, LDAP injection
4. **Insecure Design** — Architectural security concerns
5. **Security Misconfiguration** — Default credentials, verbose errors in production, open CORS
6. **Vulnerable & Outdated Components** — Check dependency versions
7. **Identification & Authentication Failures** — Weak passwords, no MFA, session fixation
8. **Software & Data Integrity Failures** — Unsigned code, insecure deserialization
9. **Security Logging & Monitoring Failures** — No audit trail for sensitive operations
10. **SSRF** — Server-Side Request Forgery in outbound HTTP calls

### STRIDE Threat Model
For architecture reviews, analyze:
- **S**poofing — Can an attacker impersonate a user or service?
- **T**ampering — Can data be modified in transit or at rest?
- **R**epudiation — Can actions be denied? Is there an audit log?
- **I**nformation Disclosure — Is sensitive data exposed unnecessarily?
- **D**enial of Service — Can the system be overwhelmed?
- **E**levation of Privilege — Can a low-privilege user gain higher access?

---

## Security Reporting Format

For each finding, report:
1. **Severity**: Critical / High / Medium / Low
2. **Category**: OWASP category or pattern name
3. **Location**: File and line number
4. **Description**: What the vulnerability is
5. **Exploit Scenario**: Concrete example of how it could be exploited
6. **Remediation**: Specific fix with code example

**Only report findings with ≥ 8/10 confidence.** Do not generate noise.

---

## Source
Anthropic/Security-Guidance plugin for Claude Code  
https://github.com/anthropics/claude-code/tree/main/plugins/security-guidance  
MIT License
