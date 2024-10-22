import Explore from "../../../src/Pages/Explore/Explore";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);

describe("Explore", () => {
  // it("Render Dashboard Empty", async () => {
  //   render(
  //     <MemoryRouter>
  //       <Explore/>
  //     </MemoryRouter>
  //   )
  //   expect(screen.queryByText("Search jobs..."));

  //   expect(screen.queryByText("Sort by Highest Pay : Off"));
  //   expect(screen.queryByText("Sort by City : Off"));
  //   expect(screen.queryByText("Sort by Employment Type : Off"));
  //   expect(screen.queryByText("Show Closed Jobs"));

  //   expect(screen.queryByText("Sort by High Pay : On")).toBeNull();
  //   expect(screen.queryByText("Sort by City : On")).toBeNull();
  //   expect(screen.queryByText("Sort by Employment Type : On")).toBeNull();
  //   expect(screen.queryByText("Show Open Jobs")).toBeNull();

  //   await userEvent.click(screen.getByRole('button', { name: "Sort by Highest Pay : Off" }));
  //   await userEvent.click(screen.getByRole('button', { name: "Sort by City : Off" }));
  //   await userEvent.click(screen.getByRole('button', { name: "Sort by Employment Type : Off" }));
  //   await userEvent.click(screen.getByRole('button', { name: "Show Closed Jobs" }));

  //   expect(screen.queryByText("Sort by Highest Pay : Off")).toBeNull();
  //   expect(screen.queryByText("Sort by City : Off")).toBeNull();
  //   expect(screen.queryByText("Sort by Employment Type : Off")).toBeNull();
  //   expect(screen.queryByText("Show Closed Jobs")).toBeNull();

  //   expect(screen.queryByText("Sort by High Pay : On"));
  //   expect(screen.queryByText("Sort by City : On"));
  //   expect(screen.queryByText("Sort by Employment Type : On"));
  //   expect(screen.queryByText("Show Open Jobs"));

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
      <Explore />
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
      <Explore />
      );
    </MemoryRouter>;
  });
});
