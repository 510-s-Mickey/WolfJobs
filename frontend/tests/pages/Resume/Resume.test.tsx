import { render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import Resume from "../../../src/Pages/Resume/Resume";
import ResumeViewer from "../../../src/components/Resume/ResumeViewer";
import { MemoryRouter } from "react-router";

describe("Resume", () => {
  it ("Renders Resume", () => {
    render(
      <MemoryRouter>
        <Resume/>
      </MemoryRouter>
    )

    expect(screen.queryByText("Drag 'n' drop somefiles here, or click to select files"));
    expect(screen.getByRole('button', {name: /Upload Resume/i}));    
    expect(screen.getByRole('presentation'));  

  });

  it ("Renders Resume Viewer", () => {
    render(
      <MemoryRouter>
        <ResumeViewer/>
      </MemoryRouter>
    )

    expect(screen.queryByText("Page 1 of"));
    expect(screen.queryByText("Failed to load PDF file."));
    expect(screen.getByRole('button', {name: /Previous/i}));   
    expect(screen.getByRole('button', {name: /Next/i}));  
  });

});