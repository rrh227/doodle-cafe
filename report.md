# Claude Usage Report — Doodle Cafe

_Generated: 2026-09-02 · Source: local session transcripts from both project history directories (`-GitHub-galileo-game-jam` + `-GitHub-doodle-cafe`)_

This report consolidates Claude Code usage across the **entire life of the
project** — both before and after the repo was renamed from `galileo-game-jam`
to `doodle-cafe`. Stats are summed across all recorded sessions; findings are
consolidated across the whole history. All numbers are pulled directly from the
session transcripts, not estimated.

---

## Scope

- **9 transcript files** across 2 history directories (repo was renamed
  mid-project, splitting history across two folders).
- **7 sessions with real activity**; 2 are empty/stub sessions (`d61fbeeb` had
  0 turns, `5548aff4` was a 2-turn no-op).
- **Full span:** 2026-08-18 → 2026-09-02 (~15 days of on-and-off work).

---

## Grand Totals (all sessions summed)

| Metric | Value |
|---|---|
| Recorded sessions | 9 files (7 active) |
| Calendar span | 2026-08-18 14:32 → 2026-09-02 17:04 UTC |
| Assistant turns (billed) | 1,740 |
| Input tokens (fresh) | 111,126 |
| Output tokens | 2,151,026 |
| Cache read tokens | 134,372,058 |
| Cache write tokens | 10,674,670 |

Cache reads (~134M) dominate fresh input (~111K) by roughly 1,200×. Long
multi-turn sessions replay a large cached prefix (system prompt, CLAUDE.md
policy, accumulated conversation) on every turn, so fresh billed input stays
small even as the project grows.

---

## Per-Model Breakdown (summed across all sessions)

| Model | Turns | Output | Cache read | Cache write |
|---|---|---|---|---|
| `claude-fable-5` | 1,055 | 1,835,627 | 86,931,719 | 6,944,432 |
| `claude-opus-4-6` | 661 | 295,132 | 46,765,129 | 3,416,564 |
| `claude-opus-4-8` | 24 | 20,267 | 675,210 | 313,674 |

Three models appear across the project's life. Early game-building sessions
(mid-to-late August) ran on **Opus 4.6**; the bulk of later work ran on
**fable-5**; **Opus 4.8** appears only in the final deployment/reporting
session after a manual `/model` switch.

---

## Tool Usage (summed across all sessions)

| Tool | Calls |
|---|---|
| Edit | 304 |
| Bash | 228 |
| Write | 181 |
| Read | 179 |
| TaskUpdate | 48 |
| TaskCreate | 26 |
| AskUserQuestion | 14 |
| Agent | 12 |
| ToolSearch | 8 |
| TaskStop | 1 |

Edit + Write (485 combined) exceed reads, reflecting a project that was mostly
*authored* here — game code, assets config, JSON data, docs — rather than just
explored. `Agent` (12) and the Task tools (74 combined) show subagent
delegation and progress tracking were used during the heavier build sessions.

---

## Per-Session Summary

| Session | Span | Turns | Output | Model(s) | Notable |
|---|---|---|---|---|---|
| `863cfd3a` | 08-18 → 08-26 | 461 | 205K | Opus 4.6 | Longest-running; heavy authoring (108 Write, 104 Edit) — core game build |
| `fb021995` | 08-31 → 09-01 | 198 | 90K | Opus 4.6 | Feature/polish pass (39 Edit, 27 Write) |
| `51fd493d` | 09-01 → 09-02 | 393 | 865K | fable-5 | Highest output; big edit session (82 Edit) |
| `2b61318a` | 09-02 | 258 | 347K | fable-5 | Multi-agent work (7 Agent), tasks tracked |
| `ceeee5f5` | 09-02 | 322 | 582K | fable-5 | Late build/refactor session |
| `70e4e9ff` | 09-02 | 8 | 11K | fable-5 | Short; one Agent + one Write |
| `6344f4d3` | 09-02 | 98 | 50K | fable-5 → Opus 4.8 | **Deployment session** (this one) |
| `5548aff4` | 09-01 | 2 | 188 | Opus 4.6 | Stub / no-op |
| `d61fbeeb` | 09-01 | 0 | 0 | — | Empty |

---

## Consolidated Findings

### What worked (across the project)

- **Iterative build → verify loops.** The recurring pattern — make a change,
  run it, check output, adjust — held up across every active session. In the
  deploy session specifically, a local `preview` + `curl` smoke test caught a
  missing-assets bug *before* pushing.
- **Static-first architecture paid off at deploy time.** Because the game was
  built as a pure client-side Vite app (AI judging runs in-browser, data via
  local JSON), the eventual hosting choice was trivial and free (GitHub Pages).
- **Subagent delegation on heavy sessions.** The 09-02 build sessions used the
  `Agent` tool (12 calls) to parallelize/isolate research, keeping the main
  thread focused.
- **Decision points surfaced explicitly.** 14 `AskUserQuestion` calls over the
  project's life were used for genuine forks (host choice, repo rename, feature
  direction) rather than confirmation noise.

### What didn't work (first time)

- **First deploy 404'd.** The deploy workflow was committed and pushed, but
  GitHub Pages was never *enabled* in repo settings, so the first `main` push
  failed. Root cause: a one-time manual/API enablement step. Fixed via
  `gh api …/pages -X POST -f build_type=workflow` + workflow re-run.
- **Missing build assets.** `dist/` initially lacked `data/` and `assets/`
  because Vite only copies from a `public/` dir. Fixed by relocating them into
  `client/public/` and setting `base: './'`.
- **Environment friction.** `python3` was shimmed by asdf (`No version is
  set`), requiring a fallback to `/usr/bin/python3` for stats extraction.
- **CI deprecation warnings.** The deploy workflow flagged Node 20 deprecation
  on `checkout@v4` / `setup-node@v4` / `deploy-pages@v4`.

### What changed over the project's life

1. **Model progression:** Opus 4.6 (Aug, core build) → fable-5 (Sep, bulk of
   work) → Opus 4.8 (final deploy/reporting).
2. **Repo identity:** `galileo-game-jam` → `doodle-cafe`, with git remote and
   `package.json` URLs updated. This is why history spans two folders.
3. **Build config:** added `base: './'`; moved `client/data` + `client/assets`
   into `client/public/` so Vite bundles them.
4. **CI/CD:** added `.github/workflows/deploy.yml` for auto-deploy on push.
5. **Hosting:** GitHub Pages enabled → game live at
   https://rrh227.github.io/doodle-cafe/.

---

## Model & Effort Comparison

The project used three models, but they worked on **different phases**, so this
is qualitative, not a controlled benchmark:

| Model | Phase | Turns | Output | Character of work |
|---|---|---|---|---|
| `claude-opus-4-6` | Aug 18–Sep 1 | 661 | 295K | Core game authoring & polish; high Write/Edit ratio |
| `claude-fable-5` | Sep 1–2 | 1,055 | 1.84M | Bulk of later build/refactor; highest output volume |
| `claude-opus-4-8` | Sep 2 (end) | 24 | 20K | Deployment finishing + this report; few dense turns |

**Caveats on comparison:**
- Models were not run on identical tasks, so turn/token differences reflect
  **task shape and phase**, not isolated model capability.
- `claude-fable-5`'s huge output total is a function of running the longest,
  most edit-heavy sessions — not necessarily more "verbose" per turn.
- Effort level was only explicitly set (`medium`) in the final session, so
  effort-vs-effort comparison isn't supported by the data.

A fair head-to-head would require running the same scoped task on each model
and comparing turns, tokens, and correctness.

---

## Recommendations

- **Pin CI actions off Node 20** to clear the deprecation warnings when newer
  action majors ship.
- **Document the one-time Pages enablement** in the README so future
  clones/forks don't repeat the 404.
- **Consolidate history awareness:** the repo rename split transcripts across
  two folders — worth noting for any future usage analysis.
- **For a real model comparison,** run an identical task on each model rather
  than inferring from phase-separated sessions.
