import { render, screen } from "@testing-library/react";
import JobFinalReview from "../../../src/components/Job/JobFinalReview";
import { MemoryRouter } from "react-router";

describe("obFinalReview", () => {
  it("renders JobFinalReview", () => {
    render(
      <MemoryRouter>
        <JobFinalReview jobData={{ _id: 1 }} />
      </MemoryRouter>
    );
    expect(screen.getByText("Review"));
    expect(screen.getByText("Accepted Candidates"));
    expect(screen.getByText("Rejected Candidates"));
    const listEmpty = screen.getAllByText(/list empty/i);
    expect(listEmpty.length == 2);
  });
});
