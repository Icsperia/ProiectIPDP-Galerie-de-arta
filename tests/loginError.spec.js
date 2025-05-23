const { test, expect } = require('@playwright/test');

test('Homepage shows welcome, then login fails with incorrect password', async ({ page }) => {
    // 🏠 Verificare homepage + mesaj welcome
    await page.goto('http://localhost:3000/');
    const mainTitle = page.locator('#text_logo');
    await expect(mainTitle).toHaveText(/Infinite palette/i);

    const welcomeMessage = page.locator('#page');
    await expect(welcomeMessage).toHaveText(/~ welcome ~/i);

    // 🔐 Navigare spre login
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/login');

    // 🔓 Completare date greșite
    await page.fill('input[name="username"]', 'SandaGeorgiana2002'); // username corect
    await page.fill('input[name="password"]', 'gresit123');          // parolă greșită

    await page.click('button[type="submit"]');


    await page.waitForSelector('.error', { timeout: 5000 });
    const errorMessage = page.locator('.error');
    await expect(errorMessage).toHaveText('Parolă incorectă.');
    await page.waitForTimeout(2000);
});
