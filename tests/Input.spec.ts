import { test, expect } from "@playwright/test";
// import path from 'path';
// const filePath = path.join(__dirname, '../public/file.txt');

// 実際のページでのテスト
// test.describe("Input component", () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto("http://localhost:3000/planFeedback");
//   });
//   test("should render with default properties", async ({ page }) => {
//     const input = page.locator(".input.text").first();
//     await expect(input).toBeVisible();

//     await expect(input).toHaveAttribute("type","text");
//     await expect(input).toHaveAttribute("value","");
//   });

//   test("should accept input and trigger onChange", async ({ page }) => {
//     const input = page.locator(".input.text").nth(1);
//     await input.fill("Test value");
//     await expect(input).toHaveValue("Test value");
//   });

//   test("should handle file input", async ({ page }) => {
//     await page.waitForLoadState("load");

//     const fileInput = page.locator("input[type='file']");
//     await expect(fileInput).toBeVisible({ timeout: 10000 });
//     await fileInput.setInputFiles(filePath);
//   });

// });

test.describe("Storybook: Input component", () => {
  const baseStorybook = "http://localhost:6006/iframe.html?id=";

  test("should render with default properties", async ({ page }) => {
    await page.goto("http://localhost:6006/iframe.html?id=example-input--docs");
    const input = page.locator("input").first();
    const defaultValue = await input.inputValue();

    await expect(input).toBeVisible({ timeout: 10000 });
    await expect(input).toHaveAttribute("type", "text");
    await expect(input).toHaveValue(defaultValue);
  });
});