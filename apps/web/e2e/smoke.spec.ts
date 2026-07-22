import { test, expect } from "@playwright/test";

test.describe("TableOS smoke", () => {
  test("home renders brand", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /finest tables/i })).toBeVisible();
  });

  test("staff login and dashboard", async ({ page }) => {
    await page.goto("/staff/login");
    await page.getByLabel("Email").fill("host@kintsugi.tokyo");
    await page.getByLabel("Password").fill("tableos-demo");
    await page.getByRole("button", { name: /enter/i }).click();
    await expect(page.getByRole("heading", { name: /good evening/i })).toBeVisible({
      timeout: 15_000,
    });
  });
});
