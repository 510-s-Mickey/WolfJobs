import { render, screen } from "@testing-library/react";
import Notifications from "../../../src/Pages/Notifications/Notifications";
import { MemoryRouter } from "react-router";

describe("Notifications", () => {
  it("Render Notification page", async () => {
    render(
      <MemoryRouter>
        <Notifications/>
      </MemoryRouter>
    )

    expect(screen.queryByText("Accepted Jobs (0)"));
    expect(screen.queryByText("No accepted job notifications."));
    expect(screen.queryByText("Rejected Jobs (0)"));
    expect(screen.queryByText("No rejected job notifications."));
  });
});