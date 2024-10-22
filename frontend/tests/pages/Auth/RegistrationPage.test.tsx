import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import RegistrationPage from "../../../src/Pages/Auth/RegistrationPage";
import { MemoryRouter } from "react-router";

describe("RegistrationPage", () => {
  it("valid submit - create account", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    await userEvent.type(screen.getByLabelText(/name/i), "John Doe");
    await userEvent.type(screen.getByLabelText(/Email Id/i), "john@gmail.com"); 
    await userEvent.type(screen.getByLabelText(/^password$/i), "password");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password");
    await userEvent.type(screen.getByLabelText(/skills/i), "communication");
    
    await userEvent.click(screen.getByRole('button', {name: /sign up/i}));
    expect(screen.queryByText("My Applications"));
  });
  
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

  it("passwords don't match", async () => {
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
  });

  it("change to manager role", async () => {
    render(
      <MemoryRouter>
        <RegistrationPage />
      </MemoryRouter>
    );

    //Checks that Manager is not displayed
    expect(screen.queryByText("Manager")).toBeNull();
    expect(screen.queryByText("Applicant"));
    await userEvent.click(screen.getByRole('combobox', { name: /role/i }));
    expect(screen.getByText("Manager"));
    await userEvent.click(screen.getByText("Manager"));
    expect(screen.queryByText("Applicant")).toBeNull();
    expect(screen.getByText("Manager"));

    //New Role Toggle Appears
    expect(screen.queryByText("Affiliation"));
    expect(screen.queryByText("NC State Dining"));
    expect(screen.queryByText("Campus Enterprises")).toBeNull();
    expect(screen.queryByText("Wolfpack Outfitters")).toBeNull();
    await userEvent.click(screen.getAllByRole("combobox")[1]);
    expect(screen.queryByText("Campus Enterprises"));
    expect(screen.queryByText("Wolfpack Outfitters"));
    //switch to Wolpack Outfitters
    await userEvent.click(screen.getByText("Wolfpack Outfitters"));
    expect(screen.queryByText("Campus Enterprises")).toBeNull();
    expect(screen.queryByText("NC State Dining")).toBeNull();
    
  });
});
