import { defineConfig, devices } from '@playwright/test';
import { TestOptions } from './fixtures/test-setup';
import { standardUser } from "./data/credentials";
require('dotenv').config({quiet: true});

const deviceKeys = [
  'Desktop Chrome',
  'Desktop Firefox',
  'Desktop Safari',
  'Pixel 5',
  'iPhone 12',
  'iPhone 13',
] as const;

function makeProjects() {
  const projects = [];
  const target = process.env.TARGET_DEVICE;
  const allowed =target ? new Set(target.split(',').map(t => t.trim())) : null;
  for (const dk of deviceKeys) {
    if (allowed && !allowed.has(dk)) continue;
    const device = (devices as any)[dk];
    const slug = dk.replace(/\s+/g, '-');
    projects.push({
      name: `setup:${slug}`,
      use: { ...device, trace: 'off' },
      testMatch: /.*\.setup\.ts/,
    });
    projects.push({
      name: `e2e-logged-in:${slug}`,
      use: { ...device, storageState: `.auth/setup-${slug}.json` },
      dependencies: [`setup:${slug}`],
      testMatch: /logged-in\/.*\.spec\.ts/,
    });
    projects.push({
      name: `e2e-not-logged-in:${slug}`,
      use: { ...device },
      testMatch: /logged-out\/.*\.spec\.ts/,
    });
  }
  return projects;
}

export default defineConfig<TestOptions>({
  testDir: './tests',
  snapshotDir: './screenshots',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["line"], ["allure-playwright"], ["html", { outputFolder: "playwright-report" }], ["blob", { outputFolder: "blob-report" }]],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',

    trace: 'on-first-retry',
    user: {
      username: standardUser.username,
      password: standardUser.password,
    }
  },

  projects: makeProjects(),

  /* Configure projects for major browsers */
  // projects: [
  //   {
  //     name: 'setup',
  //     use: { 
  //       ...devices['Desktop Chrome'],
  //       trace: 'off'
  //     },
  //     testMatch: /.*\.setup\.ts/,
  //   },
  //   {
  //     name: 'e2e tests logged in',
  //     use: { 
  //       ...devices['Desktop Chrome'],
  //       storageState: '.auth/login.json'
  //     },
  //     dependencies: ['setup'],
  //     testMatch: /logged-in\/.*\.spec\.ts/,
  //   },
  //   {
  //     name: 'e2e tests not logged in',
  //     use: { 
  //       ...devices['Desktop Chrome'],
  //     },
  //     testMatch: /logged-out\/.*\.spec\.ts/,
  //   }

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
