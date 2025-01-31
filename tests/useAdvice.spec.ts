import { test, expect } from "@playwright/test";

test.describe("Button component", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/useAdvice");
    // await page.goto('http://localhost:6006/iframe.html?id=button--primary');
    const button = page.locator('.section-level-up button');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('計画を見直す');
  });
  test("renders the button with primary style", async ({ page }) => {
    const button = page.locator('.section-level-up button');
    await expect(button).toBeVisible();
    
    await expect(button).toHaveClass(/button/);
    await expect(button).toHaveClass(/button--medium/);
    await expect(button).toHaveClass(/button--secondary/);
    await expect(button).toHaveText("計画を見直す");

    await button.click();
  });

  test("check button styles", async ({ page }) => {
    const mediumButton = page.locator('.section-level-up button');
    await expect(mediumButton).toBeVisible();
    await expect(mediumButton).toHaveClass(/button--medium/);
    const smallButton = page.getByRole('button', { name: 'メールを送る' });
    await expect(smallButton).toBeVisible();
    await expect(smallButton).toHaveClass(/button--small/);
  });
  test("check button background color", async ({ page }) => {
    const button = page.locator('.section-level-up button');
    const backgroundColor = await button.evaluate((el) => 
      getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).not.toBe('');
  });

});
