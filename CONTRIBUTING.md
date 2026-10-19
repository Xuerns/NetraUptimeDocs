# Contributing to Netra Uptime Documentation

Thank you for your interest in contributing to **Netra Uptime Documentation** (`NetraUptime.dev`)! Clear, accurate, and comprehensive documentation helps everyone deploy, monitor, and scale their infrastructure with Netra Uptime.

We welcome all contributions, including fixing typos, clarifying guides, updating API endpoint specifications, and adding new architecture diagrams.

---

## Fork Workflow

All contributions are submitted through GitHub Pull Requests using the fork workflow.

### 1. Fork the Repository

1. Visit the official documentation repository: [https://github.com/Xuerns/NetraUptime.dev](https://github.com/Xuerns/NetraUptime.dev).
2. Click the **Fork** button in the top right corner to create a copy under your personal GitHub account.

### 2. Clone Your Fork Locally

Clone your forked repository to your local machine:

```bash
git clone https://github.com/<your-username>/NetraUptime.dev.git
cd NetraUptime.dev
```

### 3. Configure Upstream Remote

Keep your fork synchronized with the official repository:

```bash
git remote add upstream https://github.com/Xuerns/NetraUptime.dev.git
git fetch upstream
```

### 4. Create a Topic Branch

Always branch off from `upstream/main` with a descriptive name for your changes:

```bash
git checkout -b docs/your-topic-name

# Examples:
# git checkout -b docs/getting-started-docker
# git checkout -b api/update-monitor-endpoints
# git checkout -b arch/alert-evaluation-diagram
```

---

## Local Development Setup

### Prerequisites

- **Node.js**: `v20+`
- **pnpm**: `v9+`

### Installation & Running

```bash
# 1. Install dependencies
pnpm install

# 2. Run the development server
pnpm dev
```

Visit `http://localhost:5173` to preview your changes in real-time with hot module replacement (HMR).

---

## Content Guidelines by Area

When editing documentation, refer to the relevant section below:

| Area                                | Directory / Files                                                           | Description                                                                                           |
| :---------------------------------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| **Documentation (`documentation`)** | `src/lib/components/docs/`, `src/lib/data/docs.ts`                          | Setup guides, monitors, alert rules, notifications, status pages, reverse proxies, and configuration. |
| **API Reference (`api-reference`)** | `src/lib/data/api-reference.ts`, `src/lib/components/api-reference/`        | REST API endpoint definitions, request parameters, response schemas, and code pane snippets.          |
| **Architecture (`architecture`)**   | `src/lib/components/docs/architecture/`, `src/lib/data/architecture-*.ts`   | System internals, worker pools, scheduler, caching, retention policies, and Mermaid diagrams.         |
| **Landing Page**                    | `src/lib/components/`, `src/lib/data/landing.ts`, `src/routes/+page.svelte` | Hero, features, integrations, audience, FAQ accordion, and quick-start CTA.                           |

---

## Code Quality & Validation

Before opening your Pull Request, verify that all formatting, linting, and type checks pass cleanly:

```bash
# 1. Format code with Prettier
pnpm run format

# 2. Check types with SvelteKit & TypeScript
pnpm run check

# 3. Lint with ESLint
pnpm lint

# 4. Production build verification
pnpm run build
```

---

## Submitting a Pull Request

Once your changes are tested and verified:

1. Commit your changes with a clear commit message:
   ```bash
   git add .
   git commit -m "docs(api-reference): update monitor check schema"
   ```
2. Push the branch to your fork on GitHub:
   ```bash
   git push origin docs/your-topic-name
   ```
3. Open a Pull Request from your branch against the `main` branch of [Xuerns/NetraUptime.dev](https://github.com/Xuerns/NetraUptime.dev).

---

## Pull Request Format

To ensure your Pull Request is reviewed quickly and accurately, please adhere to the following required structure:

### 1. Title Format

Structure your Pull Request title with an area tag followed by a concise description:

```text
[Area]: Brief description of changes
```

**Examples:**

- `docs(documentation): add Traefik reverse proxy configuration guide`
- `docs(api-reference): add response schema for /api/v1/monitors`
- `docs(architecture): add mermaid sequence diagram for worker pool`

### 2. Pull Request Body Template

Please use the following template when filling out your Pull Request description:

```markdown
### Title

<!-- Example: docs(api-reference): update monitor endpoint parameters -->

### Updated Areas

Select one or more areas updated in this Pull Request:

- [ ] **Documentation (`documentation`)** — Installation guides, configuration, monitoring protocols, notifications, status pages, or reverse proxy.
- [ ] **API Reference (`api-reference`)** — REST API endpoints, query/body parameters, response schemas, or code pane snippets.
- [ ] **Architecture (`architecture`)** — System architecture docs, worker/engine internals, Mermaid diagrams, caching, or data retention.
- [ ] **Landing Page / Components** — Landing page sections, navigation, FAQ accordion, or visual assets.

---

### Description

Briefly explain the changes made and the motivation behind them:

- **What was changed/added?**:
- **Why is this change needed?**:
- **Related issue (if any)**: Fixes #

---

### Verification Checklist

Ensure the following checks have been completed before submitting:

- [ ] Changes have been tested and visually verified locally (`http://localhost:5173`).
- [ ] Ran `pnpm run format` (code is formatted according to Prettier standards).
- [ ] Ran `pnpm run check` (type check passed with 0 errors).
- [ ] Ran `pnpm run build` (production static build succeeded).
- [ ] No broken links or malformed markdown syntax.
```

---

## Reporting Issues

Found a typo, outdated instruction, or missing API parameter?
Please open an issue on [GitHub Issues](https://github.com/Xuerns/NetraUptime.dev/issues) with:

- The URL or file location of the affected page.
- A description of the issue or suggested improvement.
