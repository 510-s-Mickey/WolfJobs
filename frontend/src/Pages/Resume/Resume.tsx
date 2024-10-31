import React, { useState } from "react";
import axios from "axios";
import ResumeDropzone from "../../components/Resume/ResumeDropzone";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const Resume: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const resumeName = useUserStore((state) => state.resume);
  const userId = useUserStore((state) => state.id);
  const updateResume = useUserStore((state) => state.updateResume);
  const updateResumeId = useUserStore((state) => state.updateResumeId);

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
