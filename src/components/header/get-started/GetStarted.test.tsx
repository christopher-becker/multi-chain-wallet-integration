import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../core/utils/tests/test.util";
import GetStarted from "./GetStarted";

describe("Get Started component", () => {
  it("should render the get started button component", () => {
    renderWithProviders(<GetStarted />);
    const getStartedButton = screen.findByTestId("header-get-started-button");
    expect(getStartedButton).toBeDefined();
  });
});
