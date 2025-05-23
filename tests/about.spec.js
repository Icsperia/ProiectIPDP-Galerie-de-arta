const { test, expect } = require('@playwright/test');

test('Homepage shows welcome, then user logs in and sees full About page', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const mainTitle = page.locator('#text_logo');
    await expect(mainTitle).toHaveText(/Infinite palette/i);

    const welcomeMessage = page.locator('#page');
    await expect(welcomeMessage).toHaveText(/~ welcome ~/i);

    await page.click('button:has-text("Login")');
    await page.waitForURL('**/login');

    await page.fill('input[name="username"]', 'SandaGeorgiana2002');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/about', { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/about$/);

    const pageTitle = page.locator('#page');
    await expect(pageTitle).toHaveText(/about us/i);
    await expect(page.locator('.about-section')).toBeVisible();
    await expect(page.locator('.about-card')).toHaveCount(7);
    await expect(page.locator('.greeting')).toContainText('Hello');

    await expect(page.locator('a.show', { hasText: 'See our art now' })).toBeVisible();
    await expect(page.locator('a.show', { hasText: 'See our artists now' })).toBeVisible();

    // 🎨 Pas 5: Navigare spre art, apoi înapoi la about
    await page.click('a.show', { hasText: 'See our art now' });
    await page.waitForURL('**/art', { timeout: 5000 });
    await expect(page).toHaveURL('http://localhost:3000/art');

    await page.click('a[href="/about"]');
    await page.waitForURL('**/about', { timeout: 5000 });
    await expect(page).toHaveURL('http://localhost:3000/about');
    await expect(page.locator('#page')).toHaveText(/about us/i);

    await page.click('a.show', { hasText: 'See our artists now' });
    await expect(page.locator('#page')).toHaveText(/our art/i);
    await page.waitForTimeout(3000);
});