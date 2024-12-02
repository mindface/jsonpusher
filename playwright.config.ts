import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:6006/iframe.html',
    browserName: 'chromium',
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npm run storybook',
    port: 6006,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
