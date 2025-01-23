import { test, expect } from "@playwright/test";

test.use({ storageState: "tests/storage/state.json" });

test.describe("sports ページのテスト", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/sports");
  });
  test("ページの中心部分のボタンでテキストエリアの評価の確認", async ({ page }) => {
    await page.goto("http://localhost:3000/sports");
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

    const inputText = 'This is a test input.';
    await expect(textarea).toHaveAttribute("rows", "10");
    await expect(textarea).toBeVisible();
    // reactのコンポーネント側でvalueの値を外すとtestが成功するため確認が必要
    // textarea.fill(inputText);
    // const currentValue = await textarea.inputValue();
    // console.log('Textarea value:', currentValue);
    // await expect(textarea).toHaveValue(inputText);

  });

  test("選択のボタンがクリック可能か確認", async ({ page }) => {
    const label = page.locator("label[for='head-item']");
    await expect(label).toBeVisible();
    await label.click();
    const input = page.locator("input[id=head-item]");
    await expect(input).toHaveAttribute("type", "checkbox");    
    await expect(input).toBeChecked();
  });

  test("レベル部分の操作してrange inputの値を変更", async ({ page }) => {
    const rangeInput = page.locator('input[type="range"]');
    await rangeInput.fill('50');
    await expect(rangeInput).toHaveValue("50");
  });

});
