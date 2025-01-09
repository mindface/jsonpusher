import { test, expect } from "@playwright/test";

test.describe("Input Component", () => {
  test("renders text input with correct value", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/example-input--docs");
    const input = await page.locator('input');
    await expect(input).toBeVisible();
  });

  test("renders small size input", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/example-input--small");
    const inputContainer = await page.locator("input");
    await expect(inputContainer).toBeVisible();
  });

  test("renders large size input", async ({ page }) => {
    await page.goto("http://localhost:6006/?path=/story/example-input--large");
    const inputContainer = await page.locator("input");
    await expect(inputContainer).toBeVisible();
  });
});