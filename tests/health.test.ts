import { test, expect } from "@playwright/test";

test.describe("健康ページのテスト", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/health");
  });
  test("Check the text area rating with the button in the center of the page", async ({ page }) => {
    const label = page.locator("label[for='viewTextSwitch-item']");
    await expect(label).toBeVisible();

    // label をクリックして動作を確認
    const textarea = page.locator("textarea.textarea").first();
    await expect(textarea).toBeVisible();
    await label.click();
  
    // input の状態を確認
    const input = page.locator("input[id=viewTextSwitch-item]");
    await expect(input).toHaveAttribute("type", "checkbox");
    await expect(input).toBeChecked();

    await expect(textarea).toHaveAttribute("rows", "10");
    await expect(textarea).toBeVisible();
  });

  test("Check if the selection button is clickable", async ({ page }) => {
    const label = page.locator("label[for='head-item']");
    await expect(label).toBeVisible();
    await label.click();
    const input = page.locator("input[id=head-item]");
    await expect(input).toHaveAttribute("type", "checkbox");    
    await expect(input).toBeChecked();
  });

});
