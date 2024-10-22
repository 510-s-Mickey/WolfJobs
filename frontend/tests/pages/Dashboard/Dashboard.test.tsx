import Dashboard from "../../../src/Pages/Dashboard/Dashboard";
import { MemoryRouter } from "react-router";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("Dashboard", () => {
  // it("Render Dashboard Empty", async () => {
  //   render(
  //     <MemoryRouter>
  //       <Dashboard/>
  //     </MemoryRouter>
  //   )

  //   expect(screen.queryByText("Nothing to show!"));
  //   expect(screen.queryByText("My Listings"));
  //   expect(screen.queryByText("Select a job for more details"));

  //   expect(screen.queryByText("All jobs"));
  //   expect(screen.queryByText("Profile"));
  //   expect(screen.queryByText("Log Out"));
  // });
  beforeEach(() => {
    // Clear prior mocks and configurations
    mock.reset();
  });

  test("Request for users by jobs", async () => {
    mock.onGet("http://localhost:8000/api/v1/users").reply(200, {
      jobs: [
        { _id: "1", title: "Job 1" },
        { _id: "2", title: "Job 2" },
      ],
    });
    <MemoryRouter>
      render(
      <Dashboard />
      );
    </MemoryRouter>;
  });
  test("Request for applications", async () => {
    // Mock successful API response for fetching applications
    mock
      .onGet("http://localhost:8000/api/v1/users/fetchapplications")
      .reply(200, {
        application: [{ _id: "1", jobid: "123", status: "applied" }],
      });

    <MemoryRouter>
      render(
      <Dashboard />
      );
    </MemoryRouter>;
  });
});
