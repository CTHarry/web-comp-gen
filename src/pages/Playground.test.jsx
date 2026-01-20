import React from "react";
import { render, screen } from "@testing-library/react";
import Playground from "./Playground.jsx";

test("Playground shows provider/model + generate button", () => {
  render(<Playground />);
  expect(screen.getByText("AI Provider")).toBeInTheDocument();
  expect(screen.getByText("Model")).toBeInTheDocument();

  // accessible name comes from aria-label="Generate AI copy"
  expect(screen.getByRole("button", { name: /generate ai copy/i })).toBeInTheDocument();
});
