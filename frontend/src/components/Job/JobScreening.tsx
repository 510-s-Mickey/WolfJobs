import { useCallback, useEffect, useState } from "react";
import { useApplicationStore } from "../../store/ApplicationStore";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const JobScreening = ({ jobData }: { jobData: Job }) => {
  const [displayList, setDisplayList] = useState<Application[]>([]);
  const applicationList = useApplicationStore((state) => state.applicationList);

  useEffect(() => {
    // let displayList: Application[] = [];s
    setDisplayList(
      applicationList.filter(
        (item) => item.jobid === jobData._id && item.status === "applied"
      )
    );
  }, [applicationList, jobData._id]);

  const handleStatusChange = useCallback(
    async (applicationId: string, status: string) => {
      let url = "http://localhost:8000/api/v1/users/";

      if (status === "screening") {
        url += "acceptapplication";
      } else if (status === "rejected") {
        url += "rejectapplication";
      } else {
        console.error("Invalid status");
        return;
      }

      const body = {
        applicationId: applicationId,
      };

      try {
        const response = await axios.post(url, body);
        if (response.status === 200) {
          toast.success(
            `${status === "screening" ? "Accepted" : "Rejected"} candidate`
          );
          setDisplayList((prevList) =>
            prevList.filter((item) => item._id !== applicationId)
          );
        } else {
          throw new Error("Failed to update status");
        }
      } catch (error) {
        console.error("Error updating application status:", error);
        toast.error(
          `Failed to ${status === "screening" ? "accept" : "reject"} candidate`
        );
      }
    },
    []
  );

  const handleViewResume = useCallback(async (applicantId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/applicantresume/${applicantId}`,
        {
          responseType: "blob",
        }
      );
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    } catch (error) {
      console.error("Error fetching resume:", error);
      toast.error("Failed to fetch resume");
    }
  }, []);

  return (
    <>
      <div className="text-xl">Screening</div>
      {displayList.length === 0 && (
        <div className="text-base text-gray-500">List empty</div>
      )}
      {displayList?.map((item: Application) => (
        <div key={item._id} className="p-1 ">
          <div className="p-2 mx-1 my-2 bg-white rounded-lg">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-col">
                <div> Name: {item.applicantname} </div>
                {!!item?.phonenumber && <div>Phone: {item.phonenumber} </div>}
                <div>Email: {item.applicantemail}</div>
                {!!item?.applicantSkills && (
                  <div>Skills: {item.applicantSkills}</div>
                )}
                <div className="flex justify-center px-2 py-1 ml-2 border border-gray-300 rounded-md">
                  <a
                    href="#"
                    className="text-red-500"
                    onClick={(e) => {
                      e.preventDefault();
                      handleViewResume(item.applicantid);
                    }}
                  >
                    View Resume
                  </a>
                </div>
              </div>
              <div className="flex flex-row">
                <Button
                  onClick={() => {
                    return handleStatusChange(item._id, "screening");
                  }}
                  style={{ color: "#FF5353" }}
                >
                  Accept
                </Button>
                <Button
                  onClick={() => {
                    return handleStatusChange(item._id, "rejected");
                  }}
                  style={{ color: "#FF5353" }}
                >
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default JobScreening;
