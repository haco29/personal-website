import { render, screen, within } from "@testing-library/react";

import { Nav } from "../../app/components/Nav";

describe("Nav", () => {
  it("exposes primary navigation links by their accessible names", () => {
    render(<Nav />);

    const navigation = screen.getByRole("navigation");
    const nav = within(navigation);

    expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(nav.getByRole("link", { name: "Life" })).toHaveAttribute("href", "/life");
    expect(nav.getByRole("link", { name: "Writing" })).toHaveAttribute("href", "/writing");
  });
});
