import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import VideoUrlUpload from "../../../src/components/VideoUrlUpload"; // 假设你将 Video URL Upload 封装成一个独立组件
import axios from "axios";

jest.mock("axios");

describe("VideoUrlUpload Component", () => {
  it("renders input and button", () => {
    render(<VideoUrlUpload />);

    const input = screen.getByPlaceholderText("Enter video URL");
    const button = screen.getByRole("button", { name: /Upload Video URL/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("allows user to type in URL and upload", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ status: 201 });

    render(<VideoUrlUpload />);

    const input = screen.getByPlaceholderText("Enter video URL");
    const button = screen.getByRole("button", { name: /Upload Video URL/i });

    fireEvent.change(input, { target: { value: "https://example.com" } });
    fireEvent.click(button);

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        "http://localhost:8000/users/uploadVideoUrl",
        expect.any(Object),
        expect.any(Object)
      )
    );
  });
});
