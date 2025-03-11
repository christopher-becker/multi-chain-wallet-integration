import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import Header from "./Header";
import { renderWithProviders } from "../../core/utils/tests/test.util";

describe("Header component", () => {
  beforeEach(() => {
    renderWithProviders(<Header />);
  });
  it("should render the header title", () => {
    const headerTitle = screen.getByTestId("header-title");
    expect(headerTitle.textContent).toBe("Token List");
  });
});
