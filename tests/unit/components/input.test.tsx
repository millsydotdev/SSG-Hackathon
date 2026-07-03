import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "@/components/ui/input";

describe("Input", () => {
  it("renders and accepts input", () => {
    render(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "hello" } });
    expect(input.value).toBe("hello");
  });

  it("renders with start icon", () => {
    const { container } = render(
      <Input startIcon={<span>🔍</span>} placeholder="Search" />,
    );
    expect(container.querySelector("input")).toBeInTheDocument();
  });
});
