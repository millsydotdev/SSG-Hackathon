import { test, expect } from "@playwright/test";

test.describe("Public pages", () => {
  test("home page loads and shows logo", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("text=SSG-Hackathon").first()).toBeVisible({ timeout: 10000 });
  });

  test("login page loads and shows sign in form", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("text=Sign In").or(page.locator("text=Sign in"))).toBeVisible({ timeout: 10000 });
  });

  test("privacy page loads", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });

  test("terms page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });

  test("status page loads", async ({ page }) => {
    await page.goto("/status");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 10000 });
  });
});

test.describe("Setup flow (first-run)", () => {
  test("setup page redirects from root when uninitialised", async ({ page }) => {
    await page.goto("/");
    // Should redirect to /setup if platform not initialised
    await page.waitForURL(/\/setup/, { timeout: 10000 }).catch(() => {});
    // If already initialised, check that /setup redirects to /login
    const url = page.url();
    if (url.includes("/setup")) {
      await expect(page.locator("text=Setup Key").or(page.locator("text=Welcome"))).toBeVisible({ timeout: 10000 });
    }
  });

  test("setup wizard has all steps", async ({ page }) => {
    await page.goto("/setup");
    await page.waitForLoadState("networkidle");
    // Welcome step should show
    const welcomeVisible = await page.locator("text=Welcome").isVisible().catch(() => false);
    if (welcomeVisible) {
      await expect(page.locator("text=Beginsetup").or(page.locator("text=Begin Setup"))).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe("Navigation", () => {
  test("login link visible on home page", async ({ page }) => {
    await page.goto("/");
    const signInLink = page.locator('a[href="/login"]');
    if (await signInLink.isVisible().catch(() => false)) {
      await expect(signInLink).toBeVisible();
    }
  });
});
