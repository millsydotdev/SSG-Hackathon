import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressWidget } from "@/components/mission-control/progress-widget";
import { TodayWidget } from "@/components/mission-control/today-widget";
import { BlockerWidget } from "@/components/mission-control/blocker-widget";
import { formatTimeAgo } from "@/components/mission-control/format-time-ago";

describe("ProgressWidget", () => {
  it("renders with label and percentage", () => {
    render(<ProgressWidget label="Tasks" pct={75} sub="15/20" color="bg-primary" />);
    expect(screen.getByText("Tasks")).toBeInTheDocument();
    expect(screen.getByText("15/20")).toBeInTheDocument();
  });

  it("renders progress bar with correct width", () => {
    const { container } = render(
      <ProgressWidget label="Progress" pct={50} sub="5/10" color="bg-[#3fb950]" />,
    );
    const bar = container.querySelector(".rounded-full");
    expect(bar).toBeInTheDocument();
  });

  it("handles large layout", () => {
    const { container } = render(
      <ProgressWidget label="Overall" pct={100} sub="Done" color="bg-primary" large />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("sm:col-span-3");
  });
});

describe("TodayWidget", () => {
  it("renders count and label", () => {
    render(<TodayWidget label="Due Today" count={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("Due Today")).toBeInTheDocument();
  });

  it("applies custom color", () => {
    const { container } = render(<TodayWidget label="Errors" count={3} color="text-error" />);
    const value = container.querySelector(".text-error");
    expect(value).toBeInTheDocument();
  });
});

describe("BlockerWidget", () => {
  it("renders count with error color", () => {
    render(<BlockerWidget label="Blocked Tasks" count={2} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Blocked Tasks")).toBeInTheDocument();
  });

  it("renders zero count", () => {
    render(<BlockerWidget label="Blockers" count={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});

describe("formatTimeAgo", () => {
  it('returns "just now" for recent dates', () => {
    expect(formatTimeAgo(new Date().toISOString())).toBe("just now");
  });

  it("returns minutes ago", () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    expect(formatTimeAgo(fiveMinAgo)).toBe("5m ago");
  });

  it("returns hours ago", () => {
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
    expect(formatTimeAgo(threeHoursAgo)).toBe("3h ago");
  });

  it("returns days ago", () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
    expect(formatTimeAgo(twoDaysAgo)).toBe("2d ago");
  });
});
