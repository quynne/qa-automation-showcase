import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

const UI_BASE = process.env.BASE_URL ?? 'https://www.saucedemo.com';
const UI_AUTH = './reports/ui-auth.json';

export default defineConfig({
  testDir: './_src',
  timeout: 60_000,
  retries: process.env.CI ? 1 : 0,
  fullyParallel: true,

  projects: [
    // ── API: auth setup ───────────────────────────────────────────────────────
    {
      name: 'api-setup',
      testDir: './_src/api/tests',
      testMatch: /auth\.setup\.ts$/,
    },

    // ── API: users (read + write) ─────────────────────────────────────────────
    {
      name: 'api-users',
      testDir: './_src/api/tests/users',
      dependencies: ['api-setup'],
      use: {
        baseURL: process.env.API_BASE_URL ?? 'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders: { 'Content-Type': 'application/json' },
      },
    },

    // ── UI: auth setup (runs first, saves ui-auth.json) ───────────────────────
    {
      name: 'ui-setup',
      testDir: './_src/ui/tests/login',
      testMatch: /auth\.setup\.ts$/,
      use: {
        baseURL: UI_BASE,
        headless: !!process.env.CI,
      },
    },

    // ── UI: login spec tests (standalone, no storageState) ────────────────────
    {
      name: 'ui-login',
      testDir: './_src/ui/tests/login',
      testMatch: /login\.ui\.spec\.ts$/,
      use: {
        baseURL: UI_BASE,
        headless: !!process.env.CI,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
      },
    },

    // ── UI: checkout (depends on ui-setup for auth) ───────────────────────────
    {
      name: 'ui-checkout',
      testDir: './_src/ui/tests/checkout',
      dependencies: ['ui-setup'],
      use: {
        baseURL: UI_BASE,
        storageState: UI_AUTH,
        headless: !!process.env.CI,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
      },
    },

    // ── Mobile: Android (Pixel 5 emulation) ──────────────────────────────────
    {
      name: 'mobile-android',
      testDir: './_src/mobile/tests',
      dependencies: ['ui-setup'],
      use: {
        ...devices['Pixel 5'],
        baseURL: UI_BASE,
        storageState: UI_AUTH,
        headless: !!process.env.CI,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    },

    // ── Mobile: iOS (iPhone 14 emulation) ────────────────────────────────────
    {
      name: 'mobile-ios',
      testDir: './_src/mobile/tests',
      dependencies: ['ui-setup'],
      use: {
        ...devices['iPhone 14'],
        baseURL: UI_BASE,
        storageState: UI_AUTH,
        headless: !!process.env.CI,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    },
  ],

  outputDir: './reports/results',
  reporter: [
    ['html', { outputFolder: './reports/html' }],
    ['allure-playwright', { resultsDir: './reports/allure' }],
    ['json', { outputFile: './reports/test-results.json' }],
    ['list'],
  ],
});
