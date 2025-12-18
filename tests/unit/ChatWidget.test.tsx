import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChatWidget } from "../../app/components/ChatWidget";

// Mock the Chat component to avoid API calls in unit tests
vi.mock("../../app/components/Chat", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Chat: ({ inputRef }: { inputRef?: (el: HTMLInputElement | null) => void }) => (
    <div>Chat Component</div>
  ),
}));

describe("ChatWidget", () => {
  it("shows toggle button and opens chat widget when clicked", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Button should be visible with "Open chat" label
    const openButton = screen.getByRole("button", { name: "Open chat" });
    expect(openButton).toBeInTheDocument();

    // Click to open
    await user.click(openButton);

    // Chat widget should be visible
    expect(screen.getByRole("heading", { name: "Chat" })).toBeInTheDocument();
    expect(screen.getByText("Chat Component")).toBeInTheDocument();

    // Toggle button label should change to "Close chat"
    expect(screen.getByRole("button", { name: "Close chat" })).toBeInTheDocument();
  });

  it("closes chat widget when close button in header is clicked", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open widget
    const openButton = screen.getByRole("button", { name: "Open chat" });
    await user.click(openButton);

    // Find the header close button using distinct aria-label
    const headerCloseButton = screen.getByRole("button", { name: "Close chat panel" });
    expect(headerCloseButton).toBeInTheDocument();

    // Close widget using header button
    await user.click(headerCloseButton);

    // Widget should be closed
    expect(screen.queryByRole("heading", { name: "Chat" })).not.toBeInTheDocument();
    expect(screen.queryByText("Chat Component")).not.toBeInTheDocument();

    // Button should be back to "Open chat"
    expect(screen.getByRole("button", { name: "Open chat" })).toBeInTheDocument();
  });

  it("closes chat widget when Escape key is pressed", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open widget
    const openButton = screen.getByRole("button", { name: "Open chat" });
    await user.click(openButton);

    // Verify widget is open
    expect(screen.getByRole("heading", { name: "Chat" })).toBeInTheDocument();

    // Press Escape
    await user.keyboard("{Escape}");

    // Widget should be closed
    expect(screen.queryByRole("heading", { name: "Chat" })).not.toBeInTheDocument();
  });

  it("closes chat widget when toggle button is clicked while open", async () => {
    const user = userEvent.setup();
    render(<ChatWidget />);

    // Open widget
    const openButton = screen.getByRole("button", { name: "Open chat" });
    await user.click(openButton);

    // Verify widget is open
    expect(screen.getByRole("heading", { name: "Chat" })).toBeInTheDocument();

    // Click toggle button to close
    const toggleButton = screen.getByRole("button", { name: "Close chat" });
    await user.click(toggleButton);

    // Widget should be closed
    expect(screen.queryByRole("heading", { name: "Chat" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open chat" })).toBeInTheDocument();
  });
});
