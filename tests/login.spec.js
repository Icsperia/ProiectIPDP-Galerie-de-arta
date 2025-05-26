const { test, expect } = require('@playwright/test');

test('User can log in and see about page', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'Bia');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/about');
    await expect(page).toHaveURL(/.*\/about$/);
    const pageTitle = await page.locator('#page');
    await expect(pageTitle).toHaveText(/about us/i);
    const greeting = page.locator('.greeting');
    await expect(greeting).toContainText('Hello');
});
