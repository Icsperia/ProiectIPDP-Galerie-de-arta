const { test, expect } = require('@playwright/test');

test('Homepage shows welcome, then user logs in, sees About page, and navigates to Acrylic art', async ({ page }) => {
    // 🏠 Pas 1: Verificare homepage
    await page.goto('http://localhost:3000/');
    const mainTitle = page.locator('#text_logo');
    await expect(mainTitle).toHaveText(/Infinite palette/i);

    const welcomeMessage = page.locator('#page');
    await expect(welcomeMessage).toHaveText(/~ welcome ~/i);

    // 🔐 Pas 2: Navigare spre login
    await page.click('button:has-text("Login")');
    await page.waitForURL('**/login');

    // 🔓 Pas 3: Autentificare
    await page.fill('input[name="username"]', 'SandaGeorgiana2002');
    await page.fill('input[name="password"]', '123456');
    await page.click('button[type="submit"]');

    // 📄 Pas 4: Verificare pagină About
    await page.waitForURL('**/about', { timeout: 10000 });
    await expect(page).toHaveURL(/.*\/about$/);
    await expect(page.locator('#page')).toHaveText(/about us/i);
    await expect(page.locator('.about-section')).toBeVisible();
    await expect(page.locator('.about-card')).toHaveCount(7);
    await expect(page.locator('.greeting')).toContainText('Hello');

    // 🎨 Pas 5: Navigare spre Acrylic
    await page.hover('a[href="/art"]');
    await page.click('a[href="/acrylic"]');
    await page.waitForURL('**/acrylic', { timeout: 5000 });
    await expect(page.locator('#pageTitle')).toHaveText('Acrylic');

    const products = page.locator('.product');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    const firstProduct = products.first();
    await expect(firstProduct.locator('button.addCart')).toBeVisible();
    await expect(firstProduct.locator('button.generateBtn')).toBeVisible();

    for (let i = 0; i < 10; i++) {
        await page.mouse.wheel(0, 150);  // mică derulare
        await page.waitForTimeout(200);  // pauză între mișcări
    }

    await page.waitForTimeout(3000);
});
