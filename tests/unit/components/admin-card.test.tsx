import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AdminCard } from "@/components/admin/admin-card";

describe("AdminCard", () => {
  it("renders label and value", () => {
    render(<AdminCard label="Users" value="42" icon="group" />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("renders with subtitle", () => {
    render(<AdminCard label="Storage" value="1.2 GB" icon="cloud" sub="60% used" />);
    expect(screen.getByText("1.2 GB")).toBeInTheDocument();
    expect(screen.getByText("60% used")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <AdminCard label="Test" value="0" icon="test">
        <div data-testid="child">Child Content</div>
      </AdminCard>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("applies custom color class", () => {
    const { container } = render(
      <AdminCard label="Errors" value="5" icon="error" color="text-error" />,
    );
    const valueEl = container.querySelector(".text-error");
    expect(valueEl).toBeInTheDocument();
  });
});
