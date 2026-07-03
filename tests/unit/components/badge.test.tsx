import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>NEW</Badge>);
    expect(screen.getByText("NEW")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    render(<Badge variant="primary">Primary</Badge>);
    const badge = screen.getByText("Primary");
    expect(badge.className).toContain("primary");
  });
});
