import { render, screen } from "@testing-library/react";

import { RootLayoutContent } from "../../app/layout";
import HomePage from "../../app/page";

describe("Home page (integration)", () => {
  it("renders the primary call-to-action to email", () => {
    render(
      <RootLayoutContent>
        <HomePage />
      </RootLayoutContent>,
    );

    const emailLink = screen.getByRole("link", { name: /email me/i });
    expect(emailLink).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });

  it("renders the carousel section above the footer", () => {
    render(
      <RootLayoutContent>
        <HomePage />
      </RootLayoutContent>,
    );

    const carouselRegion = screen.getByRole("region", { name: /topics carousel/i });
    expect(carouselRegion).toBeInTheDocument();
  });
});
