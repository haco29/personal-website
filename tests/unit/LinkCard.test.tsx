import { render, screen } from "@testing-library/react";

import { LinkCard } from "../../app/components/LinkCard";

describe("LinkCard", () => {
  it("renders a link with user-visible content and safe external-link attributes", () => {
    render(
      <LinkCard
        title="Readable title"
        description="Short description"
        href="https://example.com/post"
      />,
    );

    const link = screen.getByRole("link", { name: /readable title/i });
    expect(link).toHaveAttribute("href", "https://example.com/post");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

    // Default meta should be visible to the user.
    expect(screen.getByText("Writing")).toBeVisible();
  });
});
