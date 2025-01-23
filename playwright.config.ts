import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  // globalSetup: "./globalSetup.ts",
  use: {
    storageState: "tests/storage/state.json",
    baseURL: 'http://localhost:3000',
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'yarn dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
