import { render, screen } from "@testing-library/react";
import ResumeDropzone from "../../../src/components/Resume/ResumeDropzone";
import { MemoryRouter } from "react-router";

describe("ResumeDropzone", () => {
    it("renders ResumeDropzone", () => {
      render(
        <MemoryRouter>
          <ResumeDropzone onFileUpload={function (files: File[]): void {
                  throw new Error("Function not implemented.");
              } } />
        </MemoryRouter>
      );
      expect(screen.getByText("Drop the files here ..."));
      expect(screen.getByText("Drag 'n' drop some files here, or click to select files"))
    });
  });