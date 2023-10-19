import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { createJob } from "../../deprecateded/createJobAPI";
import { useUserStore } from "../../store/UserStore";
import { Button } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import { useEffect } from "react";

const JobPreview = () => {
  const location = useLocation();
  const { state } = location;
  const { details, questions } = state;

  const navigate = useNavigate();

  const userId = useUserStore((state) => state.id);
  const managerAffiliation = useUserStore((state) => state.affiliation);

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("form submitted");
    createJob(
      details["name"],
      userId,
      "open",
      details["location"],
      details["description"],
      details["pay"],
      details["type"],
      questions["question1"],
      questions["question2"],
      questions["question3"],
      questions["question4"],
      managerAffiliation,
      navigate
    );
  };

  useEffect(() => {
    console.log(state);
  }, []);

  return (
    <>
      <div className="flex flex-row">
        <div
          className="w-3/12  pt-10 border-r"
          style={{ height: "calc(100vh - 72px)" }}
        >
          <div className="text-2xl  translate-x-10">Create New Job Listing</div>
          <div className="flex flex-col items-start  ml-10  mt-10 ">
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Add details</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">
                Fill Questionnaire
              </span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#1E1E1E" size="20px" />
              <span className="ml-2 text-xl text-[#1E1E1E]">Preview</span>
            </div>
            <div className="inline-flex items-center flex-row  ">
              <AiFillCheckCircle color="#CBCBCB" size="20px" />
              <span className="ml-2 text-xl text-[#CBCBCB]">Confirm</span>
            </div>
          </div>
        </div>
        <div className="w-6/12">
          <div className="flex flex-col m-10 ">
            <div className="text-xl border-b border-gray-300 font-bold">
              Job Details
            </div>
            <div className="flex flex-row justify-between m-2">
              <div className="flex flex-col ">
                <div>
                  <span className="font-semibold text-lg">Role:</span>&nbsp;
                  {details["role"]}
                </div>
                <div>
                  <span className="font-semibold text-lg">Job Status:</span>
                  &nbsp;
                  <span className={`capitalize ${"text-green-500"}`}>open</span>
                </div>
                <div>
                  <span className="font-semibold text-lg capitalize">
                    Type:
                  </span>
                  &nbsp;
                  <span className="capitalize">
                    {details["jobtype"].split("-").join(" ")}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-lg">Location:</span>
                  &nbsp;
                  {details["location"]}
                </div>
              </div>
              <div className="text-3xl p-4">{details["pay"]}$/hr</div>
            </div>
            <div className="h-6" />
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Description
            </div>
            <div className="text-[#686868] mx-2">{details["description"]}</div>
            <div className="h-6" />
            <div className="text-lg border-b border-gray-300 mb-2 font-bold">
              Questions
            </div>
            <div className="text-[#686868] mx-2">
              1: {questions["question1"]}
            </div>
            <div className="text-[#686868] mx-2">
              2: {questions["question2"]}
            </div>
            <div className="text-[#686868] mx-2">
              3: {questions["question3"]}
            </div>
            <div className="text-[#686868] mx-2">
              4: {questions["question4"]}
            </div>
            <div className="mt-4 ">
              <Button
                onClick={onSubmit}
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  background: "#FF5353",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontSize: "16px",
                }}
              >
                Add Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobPreview;