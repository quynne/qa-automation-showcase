import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local', override: true });

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
        baseURL: process.env.API_BASE_URL ?? 'https://reqres.in',
        extraHTTPHeaders: {
          'Content-Type': 'application/json',
        },
      },
    },

    // ── UI: login (standalone — no storageState needed) ───────────────────────
    {
      name: 'ui-login',
      testDir: './_src/ui/tests/login',
      use: {
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        headless: !!process.env.CI,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
      },
    },

    // ── UI: checkout (depends on login storageState) ──────────────────────────
    {
      name: 'ui-checkout',
      testDir: './_src/ui/tests/checkout',
      dependencies: ['ui-login'],
      use: {
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        storageState: './reports/ui-auth.json',
        headless: !!process.env.CI,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        viewport: { width: 1280, height: 720 },
      },
    },

    // ── Mobile: login setup (Android emulation) ───────────────────────────────
    {
      name: 'mobile-login',
      testDir: './_src/ui/tests/login',
      testMatch: /auth\.setup\.ts$/,
      use: {
        ...devices['Pixel 5'],
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        headless: !!process.env.CI,
        storageState: undefined,
      },
    },

    // ── Mobile: checkout on Android (Pixel 5 emulation) ──────────────────────
    {
      name: 'mobile-android',
      testDir: './_src/mobile/tests',
      dependencies: ['mobile-login'],
      use: {
        ...devices['Pixel 5'],
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        storageState: './reports/mobile-auth.json',
        headless: !!process.env.CI,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      },
    },

    // ── Mobile: checkout on iOS (iPhone 14 emulation) ─────────────────────────
    {
      name: 'mobile-ios',
      testDir: './_src/mobile/tests',
      dependencies: ['mobile-login'],
      use: {
        ...devices['iPhone 14'],
        baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
        storageState: './reports/mobile-auth.json',
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
