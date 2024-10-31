import { render, screen } from "@testing-library/react";
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router";

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
