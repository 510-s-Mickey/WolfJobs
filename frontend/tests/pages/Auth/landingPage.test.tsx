import { render, screen } from "@testing-library/react";
import LandingPage from "../../../src/Pages/Auth/landingPage";
import { MemoryRouter } from "react-router";

describe("LandingPage", () => {
  it("renders LandingPage", () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>
    );
    expect(screen.getByText("We understand that being a student can be"));
    expect(screen.getByText("Join our dynamic team right here on campus. Earn, learn, and be part of the community that powers your daily essentials. Apply now and shape your campus experience!"));
    expect(screen.getByText("Sign Up"));
    expect(screen.getByText("OR"));
    expect(screen.getByText("Login"));
  });
});
