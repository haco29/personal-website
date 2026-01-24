import type { ReactElement } from "react";
import { render, screen } from "@testing-library/react";

import RootLayout from "../../app/layout";
import HomePage from "../../app/page";
import LifePage from "../../app/life/page";
import WritingPage from "../../app/writing/page";

const renderPageWithLayout = (page: ReactElement) => render(<RootLayout>{page}</RootLayout>);

describe("Home page (integration)", () => {
  it("renders the primary call-to-action to email", () => {
    render(<HomePage />);

    const emailLink = screen.getByRole("link", { name: /email me/i });
    expect(emailLink).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });

  it("shows the marquee on the home page", () => {
    renderPageWithLayout(<HomePage />);

    expect(screen.getByRole("heading", { name: "Community & Impact" })).toBeVisible();
  });

  it("shows the marquee on the life page", () => {
    renderPageWithLayout(<LifePage />);

    expect(screen.getByRole("heading", { name: "Community & Impact" })).toBeVisible();
  });

  it("shows the marquee on the writing page", () => {
    renderPageWithLayout(<WritingPage />);

    expect(screen.getByRole("heading", { name: "Community & Impact" })).toBeVisible();
  });
});
