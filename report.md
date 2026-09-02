# Claude Usage Report — Doodle Cafe

_Generated: 2026-09-02 · Source: local session transcript (`6344f4d3…jsonl`)_

This report summarizes Claude Code usage for the **doodle-cafe** deployment work,
based on the one recorded session for this project. All numbers are pulled
directly from the session transcript, not estimated.

---

## Session Overview

| Metric | Value |
|---|---|
| Sessions recorded | 1 |
| Duration | ~27.5 min (16:24:44 → 16:52:13 UTC) |
| User messages | 46 entries (5 substantive prompts) |
| Assistant turns | 82 |
| Models used | 2 (mid-session switch) |
| Effort level | Switched to `medium` near the end |
| Outcome | Game live at https://rrh227.github.io/doodle-cafe/ |

---

## Token Usage

| Metric | Total |
|---|---|
| Input tokens (fresh) | 170 |
| Output tokens | 34,541 |
| Cache read tokens | 2,368,357 |
| Cache write tokens | 239,792 |

Cache reads dwarf fresh input (~2.37M vs 170), which is expected: the large
system prompt, CLAUDE.md policy, and growing conversation were served from
prompt cache on nearly every turn. This is the cache working as intended —
fresh billed input stayed tiny throughout.

### Per-Model Breakdown

| Model | Turns | Output | Cache read | Cache write |
|---|---|---|---|---|
| `claude-fable-5` (initial) | 74 | 29,978 | 2,178,168 | 123,676 |
| `claude-opus-4-8` (after `/model`) | 11 | 6,459 | 190,189 | 235,711 |

The model switch happened right before this report request. Almost all
deployment work (build fixes, repo rename, Pages enablement) ran on the
initial model; Opus 4.8 came in only for the final reporting task.

---

## Tool Usage

| Tool | Calls |
|---|---|
| Bash | 28 |
| Read | 2 |
| AskUserQuestion | 2 |
| Edit | 2 |
| Write | 1 |
| ToolSearch | 1 |
| TaskStop | 1 |

Bash dominated — appropriate for a deploy task (builds, `gh` CLI, `curl` smoke
tests, git remote work). The two `AskUserQuestion` calls were used at genuine
decision points (host choice, repo rename) rather than for confirmation noise.

---

## Conversation Findings

### What worked

- **Static-site detection up front.** Early greps confirmed the "AI judging"
  ran client-side with only local JSON fetches — no backend. This correctly
  ruled out serverless hosts and pointed straight at GitHub Pages.
- **Catching the build blocker before deploy.** Noticed `dist/` was missing
  `data/` and `assets/` because Vite only copies from `public/`. Moving them
  and setting `base: './'` was verified with a local `preview` + `curl` smoke
  test (200s across page, JSON, SVG) *before* recommending a push.
- **Diagnosing the 404 from real signals.** `gh run list` (deploy failure) plus
  `gh api …/pages` (404 = Pages not enabled) pinpointed the actual cause rather
  than guessing. Enabling Pages via API and re-running the workflow fixed it,
  confirmed with live-URL smoke tests.
- **Decision points surfaced cleanly.** Host selection and the repo rename were
  offered as explicit choices with tradeoffs, not silent assumptions.

### What didn't work (first time)

- **The initial push 404'd.** The workflow was committed, but GitHub Pages was
  never enabled in repo settings, so the first `main` push failed to deploy.
  Root cause: the "enable Pages" step is a one-time manual/API action that
  hadn't been done. Fixed by `gh api …/pages -X POST -f build_type=workflow`.
- **`python3` was shimmed by asdf.** A stats query failed (`No version is set`)
  until falling back to `/usr/bin/python3`. Minor, but a reminder that the
  environment's version managers can intercept common binaries.

### What changed over the session

1. **Repo identity:** `galileo-game-jam` → `doodle-cafe` (via `gh repo rename`),
   with the local remote and `package.json` URLs updated to match.
2. **Build config:** added `base: './'`; relocated `client/data` and
   `client/assets` into `client/public/` so Vite bundles them.
3. **CI/CD:** added `.github/workflows/deploy.yml` for auto-deploy on push.
4. **Hosting:** GitHub Pages enabled with "GitHub Actions" as the source.

---

## Model & Effort Comparison

Because the model/effort switch happened only at the reporting stage, this is a
qualitative comparison, not a controlled benchmark:

| Dimension | `claude-fable-5` (deploy work) | `claude-opus-4-8` @ medium (reporting) |
|---|---|---|
| Task type | Multi-step deploy, debugging, tool orchestration | Data extraction + document synthesis |
| Turns | 74 | 11 |
| Output tokens | 29,978 (spread over many small tool cycles) | 6,459 (few, denser turns) |
| Style observed | Many short verify-as-you-go tool loops | Fewer turns, front-loaded data gathering |

**Caveat:** the two models worked on different tasks, so raw turn/token counts
reflect task shape more than model capability. A fair comparison would require
running the same task on both. For the deploy work, the tight
build→verify→adjust loop was the right pattern regardless of model.

---

## Recommendations

- **Pin CI action versions off Node 20.** Workflow annotations flagged Node 20
  deprecation (`checkout@v4`, `setup-node@v4`, etc.). Bump when newer majors
  ship to avoid forced-runtime warnings.
- **Document the one-time Pages enablement** in the repo README so future
  clones/forks don't hit the same 404.
- **For a true model/effort comparison,** run an identical scoped task on each
  model and compare turns, tokens, and correctness — the current data can't
  isolate model performance from task differences.
