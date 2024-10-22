import { render, screen } from "@testing-library/react";
import NavBar from "../../../src/components/Header/NavBar";
import { MemoryRouter } from "react-router";

describe("NavBar", () => {
  it("renders NavBar", () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.queryByText("My Applications"));
    expect(screen.queryByText("All Jobs"));
    expect(screen.queryByText("Profile"));
    expect(screen.queryByText("Upload Resume"));
    expect(screen.queryByText("Notifications (0)"));
    expect(screen.queryByText("Log Out"));
  });
});
