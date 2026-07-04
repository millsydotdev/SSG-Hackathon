import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HealthIndicator } from "@/components/admin/health-indicator";

describe("HealthIndicator", () => {
  it("renders healthy status", () => {
    render(<HealthIndicator status="healthy" label="Database" />);
    expect(screen.getByText("Database")).toBeInTheDocument();
  });

  it("renders error status", () => {
    render(<HealthIndicator status="error" label="API" sub="Connection failed" />);
    expect(screen.getByText("API")).toBeInTheDocument();
    expect(screen.getByText("Connection failed")).toBeInTheDocument();
  });

  it("renders warning status", () => {
    render(<HealthIndicator status="warning" label="Storage" />);
    expect(screen.getByText("Storage")).toBeInTheDocument();
  });

  it("renders with different sizes", () => {
    const { container } = render(<HealthIndicator status="healthy" label="Test" size="lg" />);
    const indicator = container.querySelector(".h-3");
    expect(indicator).toBeInTheDocument();
  });
});
