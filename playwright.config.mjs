import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.mjs",
  outputDir: "test-results",
  fullyParallel: true,
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 20,
    },
  },
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4173",
    animations: "disabled",
    trace: "on-first-retry",
  },
  webServer: {
    command: "node scripts/build.mjs && node scripts/serve.mjs --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: true,
    timeout: 120_000,
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone X"],
      },
    },
  ],
});
