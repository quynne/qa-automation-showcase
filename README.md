# QA Automation Showcase

> AI-driven test automation framework — Playwright (Web + API), multi-agent review pipeline, CI/CD with GitHub Actions.

![CI](https://github.com/YOUR_USERNAME/qa-automation-showcase/actions/workflows/ci.yml/badge.svg)

---

## What This Is

A production-grade QA automation framework built with Claude AI as the core engine. It goes beyond simple test generation — it implements a **full AI-powered QA workflow** with multi-agent review gates at every stage.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Test framework | Playwright (TypeScript) |
| UI testing | Sauce Demo (e-commerce) |
| API testing | Reqres.in (REST API) |
| Reporting | Allure + HTML + JSON |
| CI/CD | GitHub Actions (daily schedule + PR trigger) |
| AI engine | Claude (Anthropic) |
| Agent framework | BMAD multi-agent system |

---

## AI Workflow Pipeline

```
Feature Doc / API Spec / Figma
         │
         ▼
    /tc (AI generates test cases)
         │
         ▼
    /review-tc (multi-agent gate)
    ┌────────────────────────────┐
    │  Dev Agent    → code lens  │
    │  Tester Agent → coverage   │
    │  BA Agent     → requirements│
    │  PM Agent     → scope/risk │
    └────────────────────────────┘
         │ all approved
         ▼
    /impl (AI implements test code)
         │
         ▼
    npm run typecheck
         │
         ▼
    /run (execute + review results)
         │
         ▼
    /review-spec → PR ready
```

Each gate requires all 4 agent perspectives to approve before proceeding.

---

## Project Structure

```
qa-automation-showcase/
├── _src/
│   ├── api/
│   │   ├── services/         # API service objects (typed)
│   │   └── tests/
│   │       └── users/        # User CRUD test suite
│   └── ui/
│       ├── pages/            # Page Object Models
│       └── tests/
│           ├── login/        # Login flow + auth setup
│           └── checkout/     # E-commerce checkout flow
├── .agents/skills/           # AI skill definitions
│   ├── tc.md                 # Test case generation
│   ├── review-tc.md          # Multi-agent review
│   └── impl.md               # Test implementation
├── .github/workflows/
│   └── ci.yml                # GitHub Actions CI
├── CLAUDE.md                 # AI agent configuration
└── playwright.config.ts      # Multi-project config
```

---

## Test Coverage

### UI Tests (Sauce Demo)
| Suite | Tests | Tags |
|-------|-------|------|
| Login | 5 | @smoke, @security |
| Checkout | 5 | @smoke |

### API Tests (Reqres.in)
| Suite | Tests | Tags |
|-------|-------|------|
| Users CRUD | 9 | @smoke, @security |

All test cases follow **Valid / Invalid / Security** grouping.

---

## CI/CD Pipeline

```
push / PR / daily schedule
        │
        ▼
   [validate] typecheck
        │
   ┌────┴────┐
   ▼         ▼
[api-tests] [ui-tests]   ← run in parallel
   │         │
   └────┬────┘
        ▼
 [publish-report] → GitHub Pages
```

- Runs on every push to `main`/`develop`
- Daily smoke run at 08:00 UTC
- HTML report published to GitHub Pages automatically
- Screenshots uploaded on failure

---

## Quick Start

```bash
# Install dependencies
npm install
npx playwright install chromium

# Copy env file
cp .env.example .env

# Run all tests
npm test

# Run specific suites
npm run test:api
npm run test:ui
npm run test:smoke

# View report
npm run report
```

---

## Key Design Decisions

**Why multi-agent review?**
A single AI perspective misses blind spots. By routing every output through Dev, Tester, BA, and PM lenses simultaneously, coverage gaps and scope issues are caught before implementation — not after.

**Why Playwright for both UI and API?**
Single tool, single config, single report. No context switching between tools. API tests benefit from Playwright's built-in request fixtures and Allure integration.

**Why Service Object + Page Object patterns?**
Decouples test logic from implementation details. When the app changes, only the service/page layer needs updating — not every test file.

---

## About

Built by a QA Engineer with 3+ years of experience in e-commerce/retail management software testing. This framework reflects the same architecture used in production for a retail management platform serving thousands of merchants.

**Available for freelance projects** — [Connect on LinkedIn](https://linkedin.com/in/YOUR_PROFILE)
