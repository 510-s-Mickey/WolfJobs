import JobListTile from "./JobListTile";

const JobsListView = (props: any) => {
  const { jobsList, applicationList } = props;
  return (
    <>
      <div className="w-4/12 bg-white/60 overflow-y-scroll overflow-x-hidden pt-2 px-9">
        <div className="text-2xl py-4">All jobs</div>
        {jobsList &&
          jobsList?.map((job: Job) => {
            return <JobListTile data={job} key={job._id} />;
          })}
        {applicationList &&
          applicationList?.map((job: Application) => {
            return <JobListTile data={job} key={job._id} />;
          })}
      </div>
    </>
  );
};

export default JobsListView;
