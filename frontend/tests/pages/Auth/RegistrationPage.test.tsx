import { render, screen } from "@testing-library/react";
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router";

import { validatePasswordStrength } from "../../../src/Pages/Auth/RegistrationPage";


describe("LogoutPage", () => {
  it("renders LogoutPage", () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Create New Account"));
    expect(screen.getByText("Sign up"));
  });
});


describe("validatePasswordStrength", () => {
  it("returns error message for password without uppercase", () => {
    const result = validatePasswordStrength("lowercase1");
    expect(result).toBe("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
  });

  it("returns error message for password without lowercase", () => {
    const result = validatePasswordStrength("UPPERCASE1");
    expect(result).toBe("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
  });

  it("returns error message for password without number", () => {
    const result = validatePasswordStrength("NoNumber");
    expect(result).toBe("Password must be at least 8 characters long and include uppercase, lowercase, and a number.");
  });

  it("returns true for a strong password", () => {
    const result = validatePasswordStrength("StrongPass1");
    expect(result).toBe(true);
  });
});