import React, { useState, useEffect } from "react";
import axios from "axios";
import ResumeDropzone from "../../components/Resume/ResumeDropzone";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const Resume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [temporaryVideoUrl, setTemporaryVideoUrl] = useState<string>("");

  const resumeName = useUserStore((state) => state.resume);
  const videoUrl = useUserStore((state) => state.videoUrl);
  const updateVideoUrl = useUserStore((state) => state.updateVideoUrl);
  const userId = useUserStore((state) => state.id);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);

  // Fetch video URL on component load
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/users/getVideoUrl/${userId}`
        );
        if (response.status === 200 && response.data.videoUrl) {
          updateVideoUrl(response.data.videoUrl); // Update Zustand store
        }
      } catch (error) {
        console.error("Error fetching video URL:", error);
      }
    };

    if (userId) {
      fetchVideoUrl();
    }
  }, [userId, updateVideoUrl]);

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("id", userId);

      setIsUploading(true);

      try {
        const response = await axios.post(
          "http://localhost:8000/users/uploadResume",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total!
              );
              setUploadProgress(progress);
            },
          }
        );

        if (response.status === 201) {
          console.log("Resume uploaded successfully");
          console.log(userId);
          toast.success("Resume Uploaded Successfully!");
          updateResume(file.name);
          updateResumeId(response.data.resumeId);
        }
      } catch (error) {
        console.error("Error uploading the resume", error);
        toast.error("Resume could not be uploaded");
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  };

  const handleVideoUrlSubmit = async () => {
    console.log("Sending userId:", userId); // print userId
    console.log("Sending videoUrl:", temporaryVideoUrl); // print videoUrl

    if (!temporaryVideoUrl || !userId) {
      console.error("Missing videoUrl or userId");
      return;
    }

    if (temporaryVideoUrl) {
      try {
        const response = await axios.post(
          "http://localhost:8000/users/uploadVideoUrl",
          { videoUrl: temporaryVideoUrl, userId },
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 201) {
          console.log("Video URL uploaded successfully");
          toast.success("Video URL Uploaded Successfully!");

          // save the uploaded video url
          updateVideoUrl(temporaryVideoUrl);
          setTemporaryVideoUrl(""); // clear the input field
        }
      } catch (error) {
        console.error("Error uploading the video URL", error);
        toast.error("Video URL could not be uploaded");
      }
    }
  };

  const getFilePreviewUrl = () => {
    if (!file) return null;
    return URL.createObjectURL(file);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-1/3">
          <ResumeDropzone
            onFileUpload={(acceptedFiles) => setFile(acceptedFiles[0])}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!file || isUploading}
            style={{
              background: "#FF5353",
              borderRadius: "10px",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            {isUploading ? `Uploading... ${uploadProgress}%` : "Upload Resume!"}
          </Button>

          <div className="mt-4 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Enter video URL"
              value={temporaryVideoUrl}
              onChange={(e) => setTemporaryVideoUrl(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleVideoUrlSubmit}
              disabled={!temporaryVideoUrl}
              style={{
                background: "#FF5353",
                borderRadius: "10px",
                textTransform: "none",
                fontSize: "16px",
                marginTop: "10px",
              }}
            >
              Upload Video URL
            </Button>

            {videoUrl && (
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  if (videoUrl) {
                    window.open(videoUrl, "_blank");
                  } else {
                    toast.error("No video URL found");
                  }
                }}
                style={{
                  textTransform: "none",
                  fontSize: "16px",
                  marginLeft: "10px",
                }}
              >
                Current Video
              </Button>
            )}
          </div>

          {file && !isUploading && (
            <div className="mt-4">
              <p> Selected file: {file.name}</p>
              {getFilePreviewUrl() && (
                <a
                  href={getFilePreviewUrl()!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded"
                >
                  Preview File
                </a>
              )}
            </div>
          )}

          {resumeName && (
            <div className="mt-4">
              <p>Current Resume: {resumeName}</p>
              <a
                href={`http://localhost:8000/users/applicantresume/${userId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 mt-2 font-bold text-white bg-red-500 rounded"
              >
                View
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Resume;
