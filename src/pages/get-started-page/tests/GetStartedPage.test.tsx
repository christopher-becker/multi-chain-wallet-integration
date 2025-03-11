import { describe, it, expect, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import GetStartedPage from "../GetStartedPage";
import { renderWithProviders } from "../../../core/utils/tests/test.util";

describe("Get started page component", () => {
  beforeEach(() => {
    renderWithProviders(<GetStartedPage />);
  });
  it("should render the page heading name", () => {
    const heading = screen.getByTestId("page-heading");
    expect(heading.textContent).toBeDefined();
  });
  it("should render state connect button components", async () => {
    const stateConnectButton = screen.getAllByTestId("state-connect-button");
    expect(stateConnectButton.length).toBeGreaterThan(0);
  });
});
