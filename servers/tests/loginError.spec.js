const { test, expect } = require('@playwright/test');

test('User sees error when logging in with wrong password', async ({ page }) => {
    await page.goto('http://localhost:3000/login');

    await page.fill('input[name="username"]', 'Bia'); // username corect
    await page.fill('input[name="password"]', 'gresit123'); // parolă greșită

    await page.click('button[type="submit"]');

    await page.waitForSelector('.error', { timeout: 5000 });
    const errorMessage = page.locator('.error');
    await expect(errorMessage).toHaveText('Parolă incorectă.');


});
