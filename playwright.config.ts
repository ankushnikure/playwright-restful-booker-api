import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',

    // Run tests in parallel
    fullyParallel: true,

    // Fail CI if test.only is accidentally committed
    forbidOnly: !!process.env.CI,

    // Retry failed tests on CI
    retries: process.env.CI ? 2 : 0,

    // Use one worker on CI
    workers: process.env.CI ? 1 : undefined,

    // Generate HTML report
    reporter: 'html',

    // Collect trace when a test is retried
    use: {
        trace: 'on-first-retry',
    },
});