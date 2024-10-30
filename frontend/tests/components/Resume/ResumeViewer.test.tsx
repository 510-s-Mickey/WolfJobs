import { render, screen } from "@testing-library/react";
import ResumeViewer from "../../../src/components/Resume/ResumeViewer";
import { MemoryRouter } from "react-router";

describe("ResumeViewer", () => {
  it("renders ResumeViewer", () => {
    render(
      <MemoryRouter>
        <ResumeViewer />
      </MemoryRouter>
    );
    expect(screen.getByText("Previous"));
    expect(screen.getByText("Next"));
    expect(screen.getByText(/Page/));
    expect(screen.getByText(/1/));
    expect(screen.getByText(/of/));
  });
});