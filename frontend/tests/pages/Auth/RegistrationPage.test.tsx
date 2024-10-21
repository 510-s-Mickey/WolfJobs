import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router";

describe("RegistrationPage", () => {
  
  it("displays error messages when the form field is empty", async () => {

    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    const errorName = screen.getByText("Name is required")
    const errorEmail = screen.getByText("Email is required")
    const errorSkills = screen.getByText("Skills is required")
    const errorPass = screen.getAllByText("Password is required")
    expect(errorName).toBeInTheDocument();
    expect(errorEmail).toBeInTheDocument();
    expect(errorSkills).toBeInTheDocument();
    expect(errorPass).toHaveLength(2);
  });

  it("passwords don't match"), async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/^password$/i), 'password');
    await userEvent.type(screen.getByLabelText(/confirm password/i), 'notpassword');

    await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    const errorPass = screen.getByText("Passwords don't match");
    expect(errorPass).toBeInTheDocument();
  }
  
  //Passwords don't match
  //Change role (drop down)
    //Manager --> additional drop down
  //Click Login Link
  //Valid Submit
});
