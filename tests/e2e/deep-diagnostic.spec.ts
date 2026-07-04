import { test, expect } from "@playwright/test";

test.describe("Deep diagnostic - find the 500 on /app", () => {
  test("capture every failing API call and render error", async ({ page }) => {
    const failures: { url: string; status: number; body: string }[] = [];
    const errors: string[] = [];
    const responses: { url: string; status: number }[] = [];

    // Capture ALL network responses
    page.on("response", (response) => {
      responses.push({ url: response.url(), status: response.status() });
      if (response.status() >= 400) {
        response.text().then((text) => {
          failures.push({ url: response.url(), status: response.status(), body: text.substring(0, 500) });
        }).catch(() => {});
      }
    });

    // Capture ALL console errors
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    page.on("pageerror", (err) => {
      errors.push(`PAGE ERROR: ${err.message}\n${err.stack?.substring(0, 500)}`);
    });

    // Try to navigate to /app
    await page.goto("/app", { waitUntil: "networkidle", timeout: 30000 }).catch((e) => {
      errors.push(`NAV FAIL: ${e.message}`);
    });

    await page.waitForTimeout(5000);

    // Log everything
    console.log("\n=== ALL RESPONSES ===");
    for (const r of responses) {
      const icon = r.status >= 400 ? "❌" : r.status >= 300 ? "↪️" : "✅";
      console.log(`  ${icon} ${r.status} ${r.url.substring(0, 120)}`);
    }

    console.log("\n=== FAILED RESPONSES ===");
    for (const f of failures) {
      console.log(`  ❌ ${f.status} ${f.url.substring(0, 120)}`);
      console.log(`     ${f.body.substring(0, 300)}`);
    }

    console.log("\n=== ERRORS ===");
    for (const e of errors) {
      console.log(`  ❌ ${e.substring(0, 500)}`);
    }

    console.log(`\n=== FINAL URL: ${page.url()} ===`);
    await page.screenshot({ path: "test-results/app-deep-diagnostic.png", fullPage: true }).catch(() => {});

    // Don't fail - just collect data
    expect(true).toBe(true);
  });
});
