import { render, screen } from "@testing-library/react";

import AboutPage from "../../app/about/page";

describe("About page (integration)", () => {
  it("renders the About heading and a key section", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "Skills" })).toBeVisible();
  });
});
