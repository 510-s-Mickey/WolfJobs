import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import CreateJob from "../../../src/Pages/CreateJob/CreateJob";
import { MemoryRouter } from "react-router";

describe("CreateJob", () => {

  it("Fill out create job information", async () => {
    render(
      <MemoryRouter>
        <CreateJob />
      </MemoryRouter>
    );

    //Add details Page
    await userEvent.type(screen.getByLabelText(/job role/i), "Barista");
    expect(screen.queryByText("Part Time")).toBeNull();
    expect(screen.queryByText("Full Time"));
    await userEvent.click(screen.getByRole('combobox', {name: /Job Type/i}));
    await userEvent.click(screen.getByText("Part Time"));
    expect(screen.getByText("Part Time"));
    expect(screen.queryByText("Full Time")).toBeNull();
    await userEvent.type(screen.getByLabelText(/location/i), "Talley");
    await userEvent.type(screen.getByLabelText(/pay/i), "20");
    await userEvent.type(screen.getByLabelText(/job description/i), "You will make coffee!");
    await userEvent.type(screen.getByLabelText(/required skills/i), "Enthusiam");
    await userEvent.click(screen.getByRole('button', {name: /proceed/i}))
  });
});
