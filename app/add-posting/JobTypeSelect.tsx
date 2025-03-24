import { EnumSelect } from "@/app/components/EnumSelect";
import JobType from "@/enums/JobType";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface JobTypeSelectProps {
  jobType: JobType | undefined;
  setJobType: (value: JobType) => void;
}

const JobTypeSelect = ({ jobType, setJobType }: JobTypeSelectProps) => {
  return (
    <EnumSelect
      value={jobType}
      setValue={setJobType}
      enumObject={JobType}
      label="Type"
      placeholder="Set a type"
      required={true}
      icon={<AccessTimeIcon />}
    ></EnumSelect>
  );
};

export default JobTypeSelect;
