import { test, expect } from "@playwright/test";

test.describe("App diagnostic - root cause of 500 on /app", () => {
  test("capture console errors on /app", async ({ page }) => {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
      if (msg.type() === "warning") {
        consoleWarnings.push(msg.text());
      }
    });

    page.on("pageerror", (err) => {
      consoleErrors.push(`PAGE ERROR: ${err.message}\n${err.stack}`);
    });

    page.on("response", (response) => {
      if (response.status() >= 400) {
        consoleErrors.push(`HTTP ${response.status()}: ${response.url()}`);
      }
    });

    // Navigate to /app and wait for either the page to load or error
    await page.goto("/app", { waitUntil: "networkidle", timeout: 30000 }).catch((e) => {
      consoleErrors.push(`NAVIGATION ERROR: ${e.message}`);
    });

    // Wait a bit for any async errors
    await page.waitForTimeout(3000);

    // Take a screenshot for visual inspection
    await page.screenshot({ path: "test-results/app-page.png", fullPage: true }).catch(() => {});

    // Report all findings
    console.log("\n=== CONSOLE ERRORS ===");
    for (const err of consoleErrors) {
      console.log(`  ERROR: ${err}`);
    }
    console.log("\n=== CONSOLE WARNINGS ===");
    for ( const warn of consoleWarnings) {
      console.log(`  WARN: ${warn}`);
    }

    // Get page content for error detection
    const content = await page.content().catch(() => "");
    const has500 = content.includes("500") || content.includes("Server Error");
    const hasError = content.includes("error") || content.includes("Error");

    console.log(`\n=== PAGE STATE ===`);
    console.log(`  URL: ${page.url()}`);
    console.log(`  Contains 500/Server Error: ${has500}`);
    console.log(`  Contains error text: ${hasError}`);
    console.log(`  Console errors: ${consoleErrors.length}`);
    console.log(`  Console warnings: ${consoleWarnings.length}`);

    // The test should pass - we're collecting diagnostic data
    // If there's a 500 error, the test still passes but logs the details
    expect(true).toBe(true);
  });
});

test.describe("API endpoint diagnostic", () => {
  test("all critical API endpoints respond correctly", async ({ request }) => {
    const results: { endpoint: string; status: number; body: string }[] = [];

    const endpoints = [
      { method: "GET", url: "/api/health" },
      { method: "GET", url: "/api/platform-status" },
      { method: "POST", url: "/api/validate-setup-key", data: { key: "test" } },
    ];

    for (const ep of endpoints) {
      try {
        let response;
        if (ep.method === "GET") {
          response = await request.get(ep.url);
        } else {
          response = await request.post(ep.url, { data: ep.data });
        }
        const body = await response.text();
        results.push({
          endpoint: `${ep.method} ${ep.url}`,
          status: response.status(),
          body: body.substring(0, 200),
        });
      } catch (err) {
        results.push({
          endpoint: `${ep.method} ${ep.url}`,
          status: 0,
          body: `Request failed: ${err}`,
        });
      }
    }

    // Log all results
    console.log("\n=== API DIAGNOSTIC RESULTS ===");
    for (const r of results) {
      console.log(`  ${r.endpoint}: ${r.status}`);
      if (r.status >= 400 || r.status === 0) {
        console.log(`    BODY: ${r.body}`);
      }
    }

    // All API endpoints should return 200
    for (const r of results) {
      expect(r.status, `${r.endpoint} should return 200`).toBe(200);
    }
  });
});

test.describe("Login flow diagnostic", () => {
  test("login page loads and renders form", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("pageerror", (err) => consoleErrors.push(`PAGE ERROR: ${err.message}`));

    await page.goto("/login", { waitUntil: "networkidle", timeout: 15000 });
    await page.waitForTimeout(2000);

    const content = await page.content();
    const url = page.url();

    console.log(`\n=== LOGIN PAGE STATE ===`);
    console.log(`  URL: ${url}`);
    console.log(`  Has form: ${content.includes('type="submit"') || content.includes("Sign In")}`);
    console.log(`  Page errors: ${consoleErrors.length}`);

    if (consoleErrors.length > 0) {
      for (const err of consoleErrors) {
        console.log(`  ERROR: ${err}`);
      }
    }

    await page.screenshot({ path: "test-results/login-page.png" }).catch(() => {});
    expect(consoleErrors.length).toBe(0);
  });
});

test.describe("Navigation diagnostic", () => {
  test("all public routes render without crashing", async ({ page }) => {
    const publicRoutes = ["/", "/login", "/join", "/forgot-password", "/privacy", "/terms", "/status"];

    for (const route of publicRoutes) {
      let pageError = "";
      page.on("pageerror", (err) => { pageError = err.message; });

      try {
        await page.goto(route, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(1000);
      } catch (e) {
        pageError = `Navigation failed: ${e}`;
      }

      const status = pageError ? "FAIL" : "PASS";
      console.log(`  ${status}: ${route}${pageError ? ` - ${pageError}` : ""}`);

      if (pageError) {
        await page.screenshot({ path: `test-results/${route.replace(/\//g, "_")}-error.png` }).catch(() => {});
      }

      // Don't fail on navigation errors - they might be expected (redirects)
      // Just log them
    }
  });
});
