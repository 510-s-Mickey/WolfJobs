import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import JobQuestionnaire from "../../../src/Pages/CreateJob/jobQuestionnaire";

describe("JobQuestionnaire", () => {
  it("Fills out JobQuestionnaire", async () => {
    render(
      <MemoryRouter>
        <JobQuestionnaire />
      </MemoryRouter>
    );

    //Add details page
    await userEvent.type(screen.getByLabelText(/question 1/i), "Question 1");
    await userEvent.type(screen.getByLabelText(/question 2/i), "Question 2");
    await userEvent.type(screen.getByLabelText(/question 3/i), "Question 3");
    await userEvent.type(screen.getByLabelText(/question 4/i), "Question 4");
  });
});
