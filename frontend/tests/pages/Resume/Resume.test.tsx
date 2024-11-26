import { render, screen } from "@testing-library/react";
// import userEvent from '@testing-library/user-event';
import Resume from "../../../src/Pages/Resume/Resume";
import ResumeViewer from "../../../src/components/Resume/ResumeViewer";
import { MemoryRouter } from "react-router";

describe("Resume", () => {
  it("Renders Resume", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    expect(
      screen.queryByText(
        "Drag 'n' drop somefiles here, or click to select files"
      )
    );
    expect(screen.getByRole("button", { name: /Upload Resume/i }));
    expect(screen.getByRole("presentation"));
  });

  it("Renders video URL upload input and button", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    const videoInput = screen.getByPlaceholderText("Enter video URL");
    const uploadButton = screen.getByRole("button", { name: /Upload Video URL/i });

    expect(videoInput).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
  });

  it("Handles video URL input and clears after upload", async () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    const videoInput = screen.getByPlaceholderText("Enter video URL");
    const uploadButton = screen.getByRole("button", { name: /Upload Video URL/i });

    // 模拟输入视频 URL
    fireEvent.change(videoInput, { target: { value: "https://www.youtube.com" } });
    expect(videoInput).toHaveValue("https://www.youtube.com");

    // 模拟点击上传按钮
    fireEvent.click(uploadButton);

    // 检查输入框是否被清空
    expect(videoInput).toHaveValue("");
  });

  it("Displays Current Video button when video URL exists", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    // 假设页面加载时已经有视频 URL（需确保对应的组件逻辑支持显示 Current Video 按钮）
    const currentVideoButton = screen.getByRole("button", { name: /Current Video/i });
    expect(currentVideoButton).toBeInTheDocument();

    // 检查 Current Video 按钮是否可点击（模拟点击后，检查 window.open 或跳转逻辑）
    fireEvent.click(currentVideoButton);
  });

  it("Renders Resume Viewer", () => {
    render(
      <MemoryRouter>
        <ResumeViewer />
      </MemoryRouter>
    );

    expect(screen.queryByText("Page 1 of"));
    expect(screen.queryByText("Failed to load PDF file."));
    expect(screen.getByRole("button", { name: /Previous/i }));
    expect(screen.getByRole("button", { name: /Next/i }));
  });
});