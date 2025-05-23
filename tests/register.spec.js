const { test, expect } = require('@playwright/test');

test('User can register successfully', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    const randomId = Date.now(); // sau Math.random()
    await page.fill('input[name="user_name"]', `user${randomId}`);
    await page.fill('input[name="password"]', 'Test1234!');
    await page.fill('input[name="first_name"]', 'Ana');
    await page.fill('input[name="last_name"]', 'Pop');
    await page.fill('input[name="email"]', `ana${randomId}@example.com`);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/login', { timeout: 10000 });
    await expect(page).toHaveURL(/\/login$/);
});
