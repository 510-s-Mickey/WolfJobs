import { render, screen } from "@testing-library/react";
import LoginPage from "../../../src/Pages/Auth/LoginPage";
import { MemoryRouter } from "react-router";

describe("LoginPage", () => {
  it("renders LoginPage", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Sign In to your Account"));
    expect(screen.getByText("Login"));
    expect(screen.getByText("Create a new account"));
  });
});
