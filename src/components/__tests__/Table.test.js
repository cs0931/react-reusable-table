/**
 * @jest-environment jsdom
 */

import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Table from "../Table";

describe("Table Component", () => {
  test("Renders loading state initially", () => {
    const { getByText } = render(<Table />);

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  it("fetches and displays data after loading", async () => {
    render(<Table />);
    jest.advanceTimersByTime(1000); // Simulate data fetching delay

    expect(screen.getByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument(); // Verify table header
    expect(screen.getByText("Item 1")).toBeInTheDocument(); // Verify first item
  });
});
