# Testing-Framework-A

A layered **Playwright + TypeScript** test automation framework. UI, API, integration and BDD tests share one codebase: page objects and API services for the app under test, **Zod** schemas for API contracts, test data and config, and Gherkin scenarios run through **[playwright-bdd](https://github.com/vitalets/playwright-bdd)**.

The tests run against **[mini-admin-panel-reference](https://github.com/SabeehAzam123/mini-admin-panel-reference)**, a small Next.js + MongoDB admin app with JWT auth and role-based access control (Admin / Staff), built as the app under test for this framework.

**Stack:** Playwright Test · TypeScript (strict) · playwright-bdd · Zod · dotenv

## What the tests cover

- **Login** through the API, the UI and a BDD scenario.
- **Users CRUD:** an Admin lists, creates, updates and deletes users through the API, and creates, edits and deletes them through the UI.
- **RBAC:** a Staff user gets `403` on create, update and delete through the API, and sees a read-only Users page in the UI (also written as a BDD scenario).
- **Integration:** a user created through the API shows up in the UI.

## How it's organized

```text
playwright/
├── e2e/              Tests only, grouped by type
│   ├── api/            API specs
│   ├── ui/             UI specs
│   ├── integration/    API + UI in one test
│   └── bdd/            Gherkin .feature files, step definitions, generated specs
├── ui/               Page objects (locators / actions / page), components, multi-step flows
├── services/         API wrappers the tests call: AuthApi, UsersApi, SessionApi
├── api-kit/          API contracts (Zod), request builders, response assertions
├── data/             Zod schemas and test-data factories
├── core/             HTTP client, JWT helpers, API and UI assertions, waiters, retry, logger
├── support/          Playwright fixtures, global setup and teardown
├── config/           Zod-validated environment variables, test tags
└── runs/             One Playwright config per suite, picking tests by tag
```

Tests sit at the top and call flows, page objects and API services; those build on `api-kit`, `data` and `core`. Path aliases (`@core/*`, `@ui/*`, `@api-kit/*`, ...) keep imports short.

- **Page Object Model, split three ways:** each page has a locators file, an actions file and a page object. Multi-step journeys (log in, create, edit or delete a user) live in `ui/flows`.
- **API contracts in Zod:** responses are parsed against the schemas in `api-kit/contracts`, so a renamed or missing field fails the test with a schema mismatch.
- **Validated config:** `.env` is parsed with Zod at startup, so a missing or malformed variable stops the run with a clear message.
- **Unique test data:** `UserFactory` builds users with unique emails and checks them with Zod before they are sent.
- **Suites by tag:** test titles carry tags (`@smoke`, `@regression`, `@api`, `@ui`, `@int`), and each config in `runs/` selects its tests by tag.
- **Stable selectors:** locators use `getByTestId` against the `data-testid` attributes the app under test exposes.
- **Failure evidence:** traces on first retry, screenshots and video kept on failure, and an HTML report.

## Running the tests

**Prerequisites:** Node.js 20+, and [mini-admin-panel-reference](https://github.com/SabeehAzam123/mini-admin-panel-reference) running at `http://localhost:3000` with its seed data loaded. Running `npm run seed` in that repo creates the Admin and Staff accounts these tests sign in with.

```bash
npm install
npx playwright install chromium
cp .env.example .env
```

The defaults in `.env.example` point at `http://localhost:3000` and match the seeded accounts.

| Command | What it runs |
|---|---|
| `npm run test:smoke` | Tests tagged `@smoke` ([`smoke.config.ts`](playwright/runs/smoke.config.ts)) |
| `npm run test:regression` | Tests tagged `@regression` ([`regression.config.ts`](playwright/runs/regression.config.ts)) |
| `npm run test:api` | Tests tagged `@api`, with screenshots, video and traces off ([`api-only.config.ts`](playwright/runs/api-only.config.ts)) |
| `npm run test:bdd` | Generates specs from the `.feature` files with `bddgen`, then runs them ([`bdd.playwright.config.ts`](playwright/runs/bdd.playwright.config.ts)) |
| `npm run show:report` | Opens the last HTML report |
