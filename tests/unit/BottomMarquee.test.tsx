import { render, screen, within } from "@testing-library/react";

import { BottomMarquee } from "../../app/components/BottomMarquee";

describe("BottomMarquee", () => {
  it("renders the community section with social proof names", () => {
    render(<BottomMarquee />);

    expect(screen.getByRole("heading", { name: "Community & Impact" })).toBeVisible();

    const list = screen.getByRole("list");
    const listScope = within(list);

    ["Acme Corp", "Globex", "TechConf (Guest Lecture)"].forEach((name) => {
      expect(listScope.getByText(name)).toBeVisible();
    });

    const lists = screen.getAllByRole("list", { hidden: true });
    expect(lists).toHaveLength(2);
    expect(lists[1]).toHaveAttribute("aria-hidden", "true");
  });
});
