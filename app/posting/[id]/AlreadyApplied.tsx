import TaskAltIcon from "@mui/icons-material/TaskAlt";

const AlreadyApplied = () => {
  return (
    <div className="my-10 flex w-full items-center justify-center gap-2">
      <TaskAltIcon className="text-green-500" fontSize="large" />
      <span className="text-lg">You have already applied for this job.</span>
    </div>
  );
};

export default AlreadyApplied;
