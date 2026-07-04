import { test, expect } from "@playwright/test";

test.describe("API endpoints", () => {
  test("health endpoint returns 200", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);
  });

  test("platform-status endpoint returns JSON", async ({ request }) => {
    const response = await request.get("/api/platform-status");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty("initialised");
    expect(typeof body.initialised).toBe("boolean");
  });

  test("validate-setup-key endpoint validates keys", async ({ request }) => {
    const response = await request.post("/api/validate-setup-key", {
      data: { key: "wrong-key" },
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.data).toHaveProperty("valid");
    expect(body.data.valid).toBe(false);
  });

  test("activity endpoint handles requests", async ({ request }) => {
    const response = await request.get("/api/activity");
    // Should respond (200 or 405 depending on method)
    expect([200, 405]).toContain(response.status());
  });
});
