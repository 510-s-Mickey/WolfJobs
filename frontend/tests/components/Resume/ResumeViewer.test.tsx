import { render } from "@testing-library/react";
import ResumeViewer from "../../../src/components/Resume/ResumeViewer";
import { MemoryRouter } from "react-router";

describe("ResumeViewer", () => {
  it("renders ResumeViewer", () => {
    render(
      <MemoryRouter>
        <ResumeViewer />
      </MemoryRouter>
    );
  });
});