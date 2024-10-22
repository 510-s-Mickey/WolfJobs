import { render, screen } from "@testing-library/react";
import JobListTile from "../../../src/components/Job/JobListTile";
import { MemoryRouter } from "react-router";

describe("JobListTile", () => {
  it("renders JobListTile Dining", () => {
    render(
      <MemoryRouter>
        <JobListTile
          data={{
            _id: 1,
            managerAffiliation: "nc-state-dining",
            pay: "100?",
            status: "closed",
          }}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText(/dining/i));
  });

  it("renders JobListTile campus enterprises", () => {
    render(
      <MemoryRouter>
        <JobListTile
          data={{
            _id: 1,
            managerAffiliation: "campus-enterprises",
            pay: "100?",
            status: "open",
          }}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText(/enterprises/i));
  });

  it("renders JobListTile wolpack outfitters", () => {
    render(
      <MemoryRouter>
        <JobListTile
          data={{
            _id: 1,
            managerAffiliation: "wolfpack-outfitters",
            pay: "100?",
            status: "open",
          }}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText(/outfitters/i));
  });

  it("renders JobListTile other", () => {
    render(
      <MemoryRouter>
        <JobListTile
          data={{
            _id: 1,
            managerAffiliation: "other",
            pay: "100?",
            status: "open",
          }}
        />
      </MemoryRouter>
    );
    expect(screen.queryByText(/other/i));
  });
});
