import { render, screen } from "@testing-library/react";

import HomePage from "../../app/page";

describe("Home page (integration)", () => {
  it("renders the primary call-to-action to email", () => {
    render(<HomePage />);

    const emailLink = screen.getByRole("link", { name: /email me/i });
    expect(emailLink).toHaveAttribute("href", expect.stringMatching(/^mailto:/));
  });
});
