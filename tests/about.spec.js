const { test, expect } = require('@playwright/test');

test('User sees full About page after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="username"]', 'Bia');
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

    // Navigare la /art
    await page.click('a.show', { hasText: 'See our art now' });
    await page.waitForURL('**/art', { timeout: 5000 });
    await expect(page).toHaveURL('http://localhost:3000/art');

    // Înapoi la about
    await page.click('a[href="/about"]');
    await page.waitForURL('**/about', { timeout: 5000 });
    await expect(page).toHaveURL('http://localhost:3000/about');
    await expect(page.locator('#page')).toHaveText(/about us/i);

    // Click pe "See our artists now" și verifică conținutul paginii
    await page.click('a.show', { hasText: 'See our artists now' });
    await expect(page.locator('#page')).toHaveText(/our art/i);

});
