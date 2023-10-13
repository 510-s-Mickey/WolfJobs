import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/UserStore";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const naviagte = useNavigate();

  const updateName = useUserStore((state) => state.updateName);
  const updateAddress = useUserStore((state) => state.updateAddress);
  const updateRole = useUserStore((state) => state.updateRole);
  const updateDob = useUserStore((state) => state.updateDob);
  const updateSkills = useUserStore((state) => state.updateSkills);
  const updatePhonenumber = useUserStore((state) => state.updatePhonenumber);
  const updateId = useUserStore((state) => state.updateId);
  const updateAvailability = useUserStore((state) => state.updateAvailability);
  const updateGender = useUserStore((state) => state.updateGender);
  const updateHours = useUserStore((state) => state.updateHours);
  const updateIsLoggedIn = useUserStore((state) => state.updateIsLoggedIn);

  const [jobsList, setJobList] = useState<Job[]>([]);

  useEffect(() => {
    const token: string = sessionStorage.getItem("token")!;
    if (!!!token) {
      naviagte("/login");
    }
    if (!!token) {
      console.log(token);
      const tokenInfo = token.split(".");
      const userInfo = JSON.parse(atob(tokenInfo[1]));
      console.log(userInfo);

      updateName(userInfo.name);
      updateAddress(userInfo.address);
      updateRole(userInfo.role);
      updateDob(userInfo.dob);
      updateSkills(userInfo.skills);
      updatePhonenumber(userInfo.phonenumber);
      updateId(userInfo._id);
      updateAvailability(userInfo.availability);
      updateGender(userInfo.gender);
      updateHours(userInfo.hours);
      updateIsLoggedIn(true);
    }
  }, []);

  const count = useRef(0);
  useEffect(() => {
    if (count.current !== 0) {
      axios
        .get("http://localhost:8000/api/v1/users", {
          params: { page: 1, limit: 25 },
        })
        .then((res) => {
          if (res.status !== 200) {
            toast.error("Error fetching jobs");
            return;
          }
          setJobList(res.data.jobs as Job[]);
        });
    }
    count.current++;
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <div className="content bg-slate-50">
        <div className="flex flex-row" style={{ height: "calc(100vh - 72px)" }}>
          <div className="w-4/12 overflow-y-scroll overflow-x-hidden mt-2 mx-5 px-4">
            <div className="text-2xl py-4">All jobs</div>
            {jobsList.map((job: Job) => {
              // return <JobListTile data={job} />;
              const x = job;
              console.log(x);
              return <JobListTile />;
            })}
          </div>
          <div
            className="w-8/12"
            style={{ height: "calc(100vh - 72px)" }}
          ></div>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            naviagte("/createjob");
          }}
          type="button"
          className=" fixed bg-red-400 text-white p-4 bottom-3 right-3"
        >
          Create Job button +
        </button>
      </div>
    </>
  );
};

type Job = {
  _id: string;
  name: string;
  skills: string[];
  managerid: string;
  status: string;
  location: string;
  description: string;
  pay: string;
  schedule: string;
};

const JobListTile = () => {
  return (
    <div className="my-3 ">
      <div className="p-3 bg-white rounded-xl">
        <div className="flex flex-row">
          <div className="w-4/6 ">
            <div className="w-fit bg-[#FF2A2A]/10 rounded-2xl px-3 py-0 ">
              <p className="inline text-xs" style={{ width: "fit-content" }}>
                {/* <div className="inline">
                  <div className="flex flex-row justify-center">
                    <div className=" p-1 w-1  bg-[#FF2A2A1A]  rounded-full"></div>
                  </div>
                </div> */}
                {"NC State Dining".toUpperCase()}
              </p>
            </div>
            <p className="text-sm">
              <b>Role:</b> Dining Associate{" "}
            </p>
            <p className="text-sm">
              <b>Job Status:</b> Closed{" "}
            </p>
            <p className="text-sm">
              <b>Type:</b> Full-time
            </p>
          </div>
          <div className="w-2/6  flex flex-col-reverse text-right">
            <p className="text-xs">Know more</p>
            <p className="text-3xl">40$/hr</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
