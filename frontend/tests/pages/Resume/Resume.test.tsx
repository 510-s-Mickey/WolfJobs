import { render, screen, fireEvent } from "@testing-library/react";
import Resume from "../../../src/Pages/Resume/Resume";
import { MemoryRouter } from "react-router";
import { useUserStore } from "../../../src/store/UserStore";
import { vi } from "vitest";

vi.mock("../../../src/store/UserStore", () => {
  const originalModule = vi.requireActual("../../../src/store/UserStore");
  return {
    ...originalModule,
    useUserStore: vi.fn(),
  };
});

describe("Resume", () => {
  beforeEach(() => {
    // Mock Zustand store
    useUserStore.mockImplementation(() => ({
      videoUrl: "",
      updateVideoUrl: vi.fn(),
      id: "testUserId",
      resume: "testResume.pdf",
      updateResume: vi.fn(),
      updateResumeId: vi.fn(),
    }));
  });

  it("Renders Resume", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Enter video URL")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload Video URL/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Upload Resume/i })).toBeInTheDocument();
  });

  it("Handles video URL input and clears after upload", async () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    const videoInput = screen.getByPlaceholderText("Enter video URL") as HTMLInputElement;
    const uploadButton = screen.getByRole("button", { name: /Upload Video URL/i });

    // Simulate entering video URL
    fireEvent.change(videoInput, { target: { value: "https://www.youtube.com" } });
    expect(videoInput.value).toBe("https://www.youtube.com");

    // Simulate clicking upload button
    fireEvent.click(uploadButton);

    // Mock Zustand should update video URL
    const updatedVideoUrl = useUserStore().updateVideoUrl;
    expect(updatedVideoUrl).toHaveBeenCalledWith("https://www.youtube.com");

    // Input should clear after upload
    expect(videoInput.value).toBe("");
  });

  it("Displays Current Video button when video URL exists", () => {
    // Mock Zustand store with existing video URL
    useUserStore.mockImplementation(() => ({
      videoUrl: "https://www.youtube.com",
      updateVideoUrl: vi.fn(),
      id: "testUserId",
      resume: "testResume.pdf",
      updateResume: vi.fn(),
      updateResumeId: vi.fn(),
    }));

    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    const currentVideoButton = screen.getByRole("button", { name: /Current Video/i });
    expect(currentVideoButton).toBeInTheDocument();

    // Simulate clicking Current Video button
    fireEvent.click(currentVideoButton);
    // No error should occur as `window.open` is handled by the browser
  });

  it("Displays Resume Viewer components", () => {
    render(
      <MemoryRouter>
        <Resume />
      </MemoryRouter>
    );

    expect(screen.getByText("Current Resume: testResume.pdf")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View/i })).toBeInTheDocument();
  });
});
