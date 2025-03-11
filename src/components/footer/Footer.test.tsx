import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../core/utils/tests/test.util";
import Footer from "./Footer";

describe("Footer component", () => {
  beforeEach(() => {
    renderWithProviders(<Footer />);
  });
  it("should render the footer title", () => {
    const title = screen.getByTestId("footer-title");
    expect(title.textContent).toBe("Footer");
  });
});
