import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";

import HomePage from "../../app/page";
import LifePage from "../../app/life/page";
import WritingPage from "../../app/writing/page";
import { BottomMarquee } from "../../app/components/BottomMarquee";

const renderPageWithMarquee = (page: ReactElement) =>
  render(
    <div>
      {page}
      <BottomMarquee />
    </div>,
  );

describe("Home page (integration)", () => {
  it("renders the primary call-to-action to email", () => {
    render(<HomePage />);

    const emailLink = screen.getByRole("link", { name: /email me/i });
    expect(emailLink).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });

  it("shows the marquee on the home page", () => {
    renderPageWithMarquee(<HomePage />);

    expect(screen.getByRole("heading", { name: "Community & Impact" })).toBeVisible();
  });

  it("shows the marquee on the life page", () => {
    renderPageWithMarquee(<LifePage />);

    expect(screen.getByRole("heading", { name: "Community & Impact" })).toBeVisible();
  });

  it("shows the marquee on the writing page", () => {
    renderPageWithMarquee(<WritingPage />);

    expect(screen.getByRole("heading", { name: "Community & Impact" })).toBeVisible();
  });
});
