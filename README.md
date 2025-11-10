# Running tests

Prerequisites
- Node.js installed (local dev): recommended LTS
- Install deps: `npm ci`
- Install Playwright browsers (locally): `npx playwright install --with-deps`

NPM scripts (defined in package.json)
- `npm run test` — runs the default script (runs `pretest` first)
- `npm run test:all` — alias for running all projects
- `npm run test:firefox` — runs tests for Firefox device(s) using TARGET_DEVICE
- `npm run test:chrome-and-iphone` — runs Chrome + iPhone device(s) using TARGET_DEVICE

Note: `pretest` runs automatically when you call `npm run test` (it runs `tsc --noEmit && eslint tests/**`). To skip pretest run Playwright directly with `npx`.

Run all projects
```bash
npx playwright test
# or
npm run test
```

Run a specific project (single project)
```bash
npx playwright test --project="DEV:e2e:logged-in:Desktop-Chrome"
```

Run multiple specific projects
```bash
npx playwright test \
  --project="setup:Desktop-Firefox" \
  --project="e2e-logged-in:Desktop-Firefox" \
  --project="e2e-not-logged-in:Desktop-Firefox"
```

Filter by device using env var (recommended pattern if config supports TARGET_DEVICE)
```bash
# run only Firefox device projects (config reads TARGET_DEVICE)
TARGET_DEVICE='Desktop Firefox' npx playwright test

# run Chrome and iPhone projects (comma separated)
TARGET_DEVICE='Desktop Chrome,iPhone 13' npx playwright test
# same via npm script:
npm run test:chrome-and-iphone
```

Run a single test file
```bash
npx playwright test tests/logged-in/add-to-cart.spec.ts
```

Run headful (headed) and single worker
```bash
npx playwright test --headed --workers=1
```

Debugging
```bash
# Playwright Inspector
PWDEBUG=1 npx playwright test --project="DEV:e2e:logged-in:Desktop-Chrome"

# or use --debug
npx playwright test --debug

# breakpoints via VS Code: run tests with --headed and attach debugger
```

Run tests by tag/grep
```bash
# run tests whose title or tag matches '@dev'
npx playwright test --grep "@dev"
```

Sharding and workers
```bash
# shard tests across 3 groups (CI parallelism)
npx playwright test --shard=1/3
# set number of workers
npx playwright test --workers=4
```

Artifacts and reports
```bash
# Show Playwright HTML report after run
npx playwright show-report

# Allure (if configured)
npx allure serve allure-results
# or generate static report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

Windows note
- For Windows scripts using environment vars, install `cross-env` and use:
```json
"test:firefox": "cross-env TARGET_DEVICE='Desktop Firefox' npx playwright test"
```

CI (GitHub Actions)
- Use the same `npx playwright test --project=...` commands in the workflow.
- To run a device matrix, either:
  - Generate per-device projects in `playwright.config.ts` and run `npx playwright test`, or
  - Use env var `TARGET_DEVICE` in the workflow for selective runs.

Tips
- `pretest` runs only when invoking the exact `npm run test` script. Use shared `check` script if you want the type/lint step in multiple npm scripts.
