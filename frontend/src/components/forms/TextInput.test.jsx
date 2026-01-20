import React from "react";
import { render, screen } from "@testing-library/react";
import { TextInput } from "./TextInput.jsx";

test("TextInput renders label + required star + error", () => {
  render(
    <TextInput
      label="Email"
      value=""
      onChange={() => {}}
      placeholder="e.g., a@b.com"
      helperText="helper"
      error="Required"
      required={true}
      ariaLabel="email input"
      type="email"
    />
  );

  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("*")).toBeInTheDocument();
  expect(screen.getByText("Required")).toBeInTheDocument();
  expect(screen.getByLabelText("email input")).toHaveAttribute("aria-invalid", "true");
});
