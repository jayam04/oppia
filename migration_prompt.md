# Acceptance Test Migration Task: Puppeteer to Playwright

## Objective

Migrate acceptance test spec files and their associated utility methods from the Puppeteer directory (`core/tests/puppeteer-acceptance-tests`) to the Playwright directory (`core/tests/playwright-acceptance-tests`), update the CI suite configuration, commit changes to Git, ensure local ports/emulators are clean, and run multi-stage test verification in a virtual display (`xvfb-run -a`) until all test environments pass.

---

## 🛑 ABSOLUTE MANDATORY RULES (STRICTLY ENFORCED)

1. **GIT AUTHOR SETUP**: Before starting, configure git credentials:
   ```bash
   git config user.email "rustyastromech@jayampatel.space"
   git config user.name "Rusty Astromech"
   ```
2. **STRICT GIT COMMIT DISCIPLINE**: You MUST commit your code changes **EVERY SINGLE TIME** before running any test command or advancing to a new phase/stage.
3. **NEVER PUSH**: **NEVER run `git push`**. Only create local commits (`git commit`).
4. **VIRTUAL DISPLAY EXECUTION (XVFB)**: Always prefix test execution commands with `xvfb-run -a` to run browsers in a headless virtual display without popping up windows on the desktop.
5. **CHECK PORTS AND STOP EMULATORS BEFORE RUNNING TESTS**:
   - Firebase emulators, backend servers, or dev servers left running on local ports (e.g. ports `8181`, `8900`, `9099`, `8080`) from previous runs will cause acceptance tests to fail incorrectly.
   - **BEFORE** launching any test command, check if local ports are free (e.g. using `lsof -i :<port>`, `fuser <port>/tcp`, or checking process list) and kill/terminate any orphaned emulator or server processes.
6. **DO NOT REWRITE OR MODIFY UTILITY CODE LOGIC**: Perform a strict **copy-paste migration**. Except for specified test block syntax rewrites in spec files, **NEVER update, refactor, optimize, or modernize** any underlying function logic, method signatures, parameters, assertions, or DOM selectors.
7. **STRICT MIGRATION ORDER**: You MUST follow this exact sequence:
   - **Step 1**: Copy and adapt spec file.
   - **Step 2**: Copy-paste missing utility methods/files.
   - **Step 3**: Update `core/tests/ci-test-suite-configs/acceptance.json`.
   - **Step 4**: Commit initial migration changes.
   - **Step 5**: Multi-stage test verification pipeline with iterative fix & commit loops.

---

## Step-by-Step Instructions

### STEP 1: Copy-Paste and Adapt Spec Files

Target directory: `core/tests/playwright-acceptance-tests/specs/<suite_folder>/`

1. **Copy the Spec File**: Copy the `.spec.ts` file from `core/tests/puppeteer-acceptance-tests/specs/<suite_folder>/` to `core/tests/playwright-acceptance-tests/specs/<suite_folder>/`.
2. **Add Playwright Imports**: Add `import {test} from '@playwright/test';` at the top of imports and adjust utility relative import paths for Playwright directory depth.
3. **Add Serial Mode**: Right after imports and constants (before top-level `test.describe`), add:
   ```typescript
   test.describe.configure({mode: 'serial'});
   ```
4. **Rewrite Test Blocks (SPEC FILES ONLY)**:
   - `describe(...)` -> `test.describe(...)`
   - `it(...)` -> `test(...)`
   - `beforeAll(...)` -> `test.beforeAll(...)`
   - `afterAll(...)` -> `test.afterAll(...)`
   - `beforeEach(...)` -> `test.beforeEach(...)`
   - `afterEach(...)` -> `test.afterEach(...)`
5. **Pass `browser` Fixture**: In `test.beforeAll(async function ({browser}) { ... })`, update `UserFactory.createNewUser(...)` calls to pass the `browser` fixture argument.
6. **Remove `__dirname` from Screenshot Matching Calls**:
   - In Playwright acceptance tests, `expectScreenshotToMatch` does not take `__dirname` as an argument. Remove `__dirname` from any `expectScreenshotToMatch` calls in the spec file.
   - Example: `await topicManager.expectScreenshotToMatch('storyEditor', __dirname);` -> `await topicManager.expectScreenshotToMatch('storyEditor');`
7. **Keep All Other Code Untouched**: Leave all other utility method calls, test steps, arguments, and logic strictly identical to the source Puppeteer spec file.

---

### STEP 2: Copy-Paste Utility Methods

Target directory: `core/tests/playwright-acceptance-tests/utilities/`

1. **Handle Missing Utility Files**: If a referenced utility file does not exist yet under `core/tests/playwright-acceptance-tests/utilities/`, create the file and copy-paste the entire content **verbatim**.
2. **Handle Missing Utility Methods**: If the destination utility file exists but is missing specific methods present in the Puppeteer utility file, copy-paste those missing methods into the Playwright class.
3. **STRICT RULE**: **NEVER** modify or refactor code inside utility methods. Copy-paste them verbatim.

---

### STEP 3: Update CI Test Suite Config

File: `core/tests/ci-test-suite-configs/acceptance.json`

1. Locate the entry for the migrated suite in `core/tests/ci-test-suite-configs/acceptance.json`.
2. Update `"module"` path from `core/tests/puppeteer-acceptance-tests/specs/...` to `core/tests/playwright-acceptance-tests/specs/...`.
3. Update `"framework"` from `"puppeteer"` to `"playwright"`.
4. Note the suite `"name"` string (e.g. `blog-admin/assign-and-remove-blog-editor-and-blog-admin-roles`). This exact string is `SUITE_NAME`.

---

### STEP 4: Commit Initial Migration Changes

Before running any tests, stage and commit all modified/created files:

```bash
git add .
git commit -m "Migrate <SUITE_NAME> acceptance test from Puppeteer to Playwright"
```

---

### STEP 5: Multi-Stage Test Verification & Fixing Pipeline

**Pre-Test Check**: Before running test commands in any stage, verify that local ports (e.g. `8181`, `8900`, `9099`, `8080`) are free and no leftover Firebase emulators or dev servers are running. Kill any orphaned processes if ports are in use.

Execute test runs in sequence using `xvfb-run -a`. **Crucial rule**: After the initial desktop run, ALL subsequent test runs MUST include the `--skip_build` flag.

#### STAGE 1: Desktop Test (Initial Run)

1. Ensure ports are free, then run command:
   ```bash
   xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots
   ```
2. **If test passes**:
   - Check if snapshot files were created/updated (`git status`).
   - If any files were modified/added, commit them:
     ```bash
     git add .
     git commit -m "Update snapshots for <SUITE_NAME> desktop test"
     ```
   - Proceed to **STAGE 2**.
3. **If test fails**:
   - Inspect full error logs to identify the exact cause of failure.
   - Apply code fix to resolve the failure.
   - **STRICT COMMIT**: Commit the fix:
     ```bash
     git add .
     git commit -m "Fix desktop test failure in <SUITE_NAME>"
     ```
   - Ensure ports are free, then re-run test with `--skip_build` and `xvfb-run -a`:
     ```bash
     xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots --skip_build
     ```
   - Repeat the **Fix -> Commit -> Re-run with `xvfb-run -a ... --skip_build`** loop until Desktop test passes cleanly.

#### STAGE 2: Mobile Test

1. Ensure ports are free, then run command:
   ```bash
   xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots --skip_build --mobile
   ```
2. **If test passes**:
   - Commit any snapshot/file changes (`git add .` and `git commit`).
   - Proceed to **STAGE 3**.
3. **If test fails**:
   - Inspect error output, fix code, and **COMMIT CHANGES**:
     ```bash
     git add .
     git commit -m "Fix mobile test failure in <SUITE_NAME>"
     ```
   - Ensure ports are free, then re-run command:
     ```bash
     xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots --skip_build --mobile
     ```
   - Repeat fix -> commit -> re-run loop until Mobile test passes cleanly.

#### STAGE 3: Production Environment Test (Desktop)

1. Ensure ports are free, then run command:
   ```bash
   xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots --skip_build --prod_env
   ```
2. **If test passes**:
   - Commit any snapshot/file changes (`git add .` and `git commit`).
   - Proceed to **STAGE 4**.
3. **If test fails**:
   - Inspect error output, fix code, and **COMMIT CHANGES**:
     ```bash
     git add .
     git commit -m "Fix prod env desktop test failure in <SUITE_NAME>"
     ```
   - Ensure ports are free, then re-run command:
     ```bash
     xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots --skip_build --prod_env
     ```
   - Repeat fix -> commit -> re-run loop until Prod Desktop test passes cleanly.

#### STAGE 4: Production Environment Test (Mobile)

1. Ensure ports are free, then run command:
   ```bash
   xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots --skip_build --prod_env --mobile
   ```
2. **If test passes**:
   - Commit any snapshot/file changes (`git add .` and `git commit`).
   - **SUCCESS! Migration for <SUITE_NAME> is 100% complete across all test environments.**
3. **If test fails**:
   - Inspect error output, fix code, and **COMMIT CHANGES**:
     ```bash
     git add .
     git commit -m "Fix prod env mobile test failure in <SUITE_NAME>"
     ```
   - Ensure ports are free, then re-run command:
     ```bash
     xvfb-run -a python -m scripts.run_acceptance_tests --suite=SUITE_NAME --update_snapshots --skip_build --prod_env --mobile
     ```
   - Repeat fix -> commit -> re-run loop until Prod Mobile test passes cleanly.

---

## Final Verification Checklist for AI Agent

- [ ] Did you configure git author (`rustyastromech@jayampatel.space` / `Rusty Astromech`)?
- [ ] Did you verify ports are free and stop leftover Firebase emulators / servers before running tests?
- [ ] Did you prefix all test commands with `xvfb-run -a`?
- [ ] Did you copy spec file FIRST and utility files/methods SECOND?
- [ ] Did you remove `__dirname` from all `expectScreenshotToMatch` calls in the spec file?
- [ ] Did you update `core/tests/ci-test-suite-configs/acceptance.json`?
- [ ] Did you commit changes BEFORE running tests for the first time?
- [ ] Did you include `--skip_build` on all test retries and subsequent stages?
- [ ] Did you commit fixes EVERY TIME before re-running failing tests?
- [ ] Did you verify all 4 stages (Desktop, Mobile, Prod Desktop, Prod Mobile)?
- [ ] Did you NEVER run `git push`?
