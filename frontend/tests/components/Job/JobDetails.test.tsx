import { render, screen } from "@testing-library/react";
import JobDetails from "../../../src/components/Job/JobDetails";
import { MemoryRouter } from "react-router";

describe("JobDetails", () => {
  it("renders JobDetails", () => {
    render(
      <MemoryRouter>
        <JobDetails
          jobData={{
            type: "part-time",
            _id: 1,
            managerid: 1,
            name: "Developer",
            status: "open",
            location: "Raleigh",
            pay: "100",
            description: "Developer",
            question1: "Work experience?",
            question2: "CGPA?",
            question3: "Age?",
            question4: "Skills?",
          }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Job Details"));
    expect(screen.getByText("Role:"));
    expect(screen.queryAllByText("Developer"));
    expect(screen.getByText("Job Status:"));
    expect(screen.getByText("open"));
    expect(screen.getByText("Type:"));
    expect(screen.queryAllByText("Part Time"));
    expect(screen.getByText("Location:"));
    expect(screen.queryAllByText("Raleigh"));
    expect(screen.getByText("Required Skills:"));

    expect(screen.getByText("Description"));
  });
});
