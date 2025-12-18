import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { Chat } from "../../app/components/Chat";

// Mock the useChat hook
const mockSendMessage = vi.fn();
const mockMessages: Array<{
  id: string;
  role: "user" | "assistant";
  parts: Array<{ type: string; text: string }>;
}> = [];
let mockStatus = "idle";
let mockError: Error | null = null;

vi.mock("@ai-sdk/react", () => ({
  useChat: () => ({
    messages: mockMessages,
    sendMessage: mockSendMessage,
    status: mockStatus,
    error: mockError,
  }),
}));

describe("Chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMessages.length = 0;
    mockStatus = "idle";
    mockError = null;
  });

  it("shows empty state message when no messages", () => {
    render(<Chat />);

    expect(screen.getByText("Ask me anything about Harel")).toBeInTheDocument();
    expect(
      screen.getByText(
        "I can answer questions about his experience, skills, writing, and interests.",
      ),
    ).toBeInTheDocument();
  });

  it("exposes chat input and send button", () => {
    render(<Chat />);

    const input = screen.getByLabelText("Chat input");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("placeholder", "Ask a question about Harel...");

    const sendButton = screen.getByRole("button", { name: "Send message" });
    expect(sendButton).toBeInTheDocument();
    expect(sendButton).toBeDisabled(); // Disabled when input is empty
  });

  it("enables send button when input has text", async () => {
    const user = userEvent.setup();
    render(<Chat />);

    const input = screen.getByLabelText("Chat input");
    const sendButton = screen.getByRole("button", { name: "Send message" });

    expect(sendButton).toBeDisabled();

    await user.type(input, "What is your experience?");

    expect(sendButton).toBeEnabled();
  });

  it("sends message when form is submitted and clears input", async () => {
    const user = userEvent.setup();
    render(<Chat />);

    const input = screen.getByLabelText("Chat input");
    const sendButton = screen.getByRole("button", { name: "Send message" });

    await user.type(input, "Tell me about yourself");
    await user.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith({
        role: "user",
        parts: [{ type: "text", text: "Tell me about yourself" }],
      });
    });

    // Input should be cleared after sending
    expect(input).toHaveValue("");
  });

  it("displays user messages", () => {
    mockMessages.push({
      id: "1",
      role: "user",
      parts: [{ type: "text", text: "What is your experience?" }],
    });

    render(<Chat />);

    expect(screen.getByText("What is your experience?")).toBeInTheDocument();
  });

  it("displays assistant messages", () => {
    mockMessages.push({
      id: "1",
      role: "assistant",
      parts: [{ type: "text", text: "I have 10+ years of experience." }],
    });

    render(<Chat />);

    expect(screen.getByText("I have 10+ years of experience.")).toBeInTheDocument();
  });

  it("displays error message when error occurs", () => {
    // Set error before rendering
    mockError = { message: "Network error occurred" } as Error;

    render(<Chat />);

    expect(screen.getByText(/Error: Network error occurred/)).toBeInTheDocument();
  });

  it("disables input and send button when loading", () => {
    // Set loading status before rendering
    mockStatus = "streaming";

    render(<Chat />);

    const input = screen.getByLabelText("Chat input");
    const sendButton = screen.getByRole("button", { name: "Send message" });

    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();
  });

  it("renders markdown content in assistant messages", () => {
    mockMessages.push({
      id: "1",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "**Bold text** and [a link](https://example.com)",
        },
      ],
    });

    render(<Chat />);

    // Verify markdown is rendered (not raw markdown syntax)
    expect(screen.getByText("Bold text")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "a link" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
