import { test, expect } from "@playwright/test";

test.describe("Storybook: Button component", () => {
  const baseStorybook = "http://localhost:6006/iframe.html?id=";

  test("should render with default properties", async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/docs/example-button--docs');
    // const html = await page.content();
    const button = await page.locator('button').first();
    await expect(button).toBeVisible({ timeout: 10000 });
  });

  test("should render with primary properties", async ({ page }) => {
    await page.goto('http://localhost:6006/?path=/story/example-button--primary');
    const button = await page.locator('.button').first();
    console.log("¥¥¥¥¥¥¥¥¥¥");
    console.log(button);
    await expect(button).toBeVisible({ timeout: 10000 });
    await expect(button).toHaveText('Button');
  });
});

// test.describe("Button component", () => {

  // test.beforeEach(async ({ page }) => {
  //   // await page.goto("http://localhost:3000/useAdvice");
  //   await page.goto('http://localhost:6006/iframe.html?id=button--primary');
  //   const button = page.locator('button');
  //   await expect(button).toBeVisible();
  //   await expect(button).toHaveText('Primary Button');
  // });
  // test("renders the button with primary style", async ({ page }) => {
  //   const button = page.getByRole('button', { name: '計画を見直す' });
  //   await expect(button).toBeVisible();
    
  //   await expect(button).toHaveClass(/button/);
  //   await expect(button).toHaveClass(/button--medium/);
  //   await expect(button).toHaveClass(/button--secondary/);
  //   await expect(button).toHaveText("計画を見直す");

  //   await button.click();
  // });

  // test("renders small button", async ({ page }) => {
  //   const button = page.getByRole('button', { name: 'メールを送る' });
    
  //   await expect(button).toHaveClass(/button/);
  //   await expect(button).toHaveClass(/button--small/);
  //   await expect(button).toHaveClass(/button--secondary/);
  //   await expect(button).toHaveText("メールを送る");
  // });
  // test("check button styles", async ({ page }) => {
  //   const mediumButton = page.getByRole('button', { name: '計画を見直す' });
  //   await expect(mediumButton).toBeVisible();
  //   await expect(mediumButton).toHaveClass(/button--medium/);
  //   const smallButton = page.getByRole('button', { name: 'メールを送る' });
  //   await expect(smallButton).toBeVisible();
  //   await expect(smallButton).toHaveClass(/button--small/);
  // });
  // test("check button background color", async ({ page }) => {
  //   const button = page.getByRole('button', { name: '計画を見直す' });
  //   const backgroundColor = await button.evaluate((el) => 
  //     getComputedStyle(el).backgroundColor
  //   );
  //   expect(backgroundColor).not.toBe('');
  // });

// });
