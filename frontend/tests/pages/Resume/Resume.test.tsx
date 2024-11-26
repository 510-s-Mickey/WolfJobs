import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Resume from "../../../src/Pages/Resume/Resume";
import ResumeViewer from "../../../src/components/Resume/ResumeViewer";
import { MemoryRouter } from "react-router";
import { useUserStore } from "../../../src/store/UserStore";

// Mock Zustand store
jest.mock("../../../src/store/UserStore", () => {
  const originalModule = jest.requireActual("../../../src/store/UserStore");
  return {
    ...originalModule,
    useUserStore: jest.fn(),
  };
});

describe("Resume", () => {
  beforeEach(() => {
    // 默认 Mock Zustand store
    useUserStore.mockReturnValue({
      videoUrl: "",
      updateVideoUrl: jest.fn(),
      id: "12345", // Mock user ID
    });
  });

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

  it("Renders video URL upload input and button", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    // 检查视频 URL 输入框和上传按钮是否存在
    const videoInput = screen.getByPlaceholderText("Enter video URL");
    const uploadButton = screen.getByRole("button", { name: /Upload Video URL/i });

    expect(videoInput).toBeInTheDocument();
    expect(uploadButton).toBeInTheDocument();
  });

  it("Handles video URL upload successfully", async () => {
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

    // 等待页面更新并显示 "Current Video" 按钮
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /Current Video/i })).toBeInTheDocument()
    );

    // 检查输入框是否清空
    expect(videoInput).toHaveValue("");
  });

  it("Renders Current Video button if video URL exists", () => {
    useUserStore.mockReturnValueOnce({
      videoUrl: "https://www.youtube.com",
      updateVideoUrl: jest.fn(),
      id: "12345",
    });

    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    // 检查是否显示 "Current Video" 按钮
    const currentVideoButton = screen.getByRole("button", { name: /Current Video/i });
    expect(currentVideoButton).toBeInTheDocument();

    // 检查按钮是否正确链接到视频 URL
    fireEvent.click(currentVideoButton);
    // 模拟 window.open() 方法（可根据具体实现方式 mock 或直接验证）
  });
});
