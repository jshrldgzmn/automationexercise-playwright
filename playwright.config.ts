import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: 'html',

  use: {
    baseURL: 'https://automationexercise.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', 
      use: { ...devices['Desktop Chrome'] } 
    },

   // { name: 'firefox', 
   //   use: { ...devices['Desktop Firefox'] } 
    //},

    { 
      name: 'smoke', 
      testMatch: '**smoke.spec.ts', 
      use: { ...devices['Desktop Chrome'] },  
    },
  ],
});