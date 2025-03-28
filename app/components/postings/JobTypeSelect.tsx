import { EnumSelect } from "@/app/components/EnumSelect";
import JobType from "@/enums/JobType";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface JobTypeSelectProps {
  jobType: JobType | undefined;
  setJobType: (value: JobType) => void;
  required?: boolean;
}

const JobTypeSelect = ({
  jobType,
  setJobType,
  required = false,
}: JobTypeSelectProps) => {
  return (
    <EnumSelect
      value={jobType}
      setValue={setJobType}
      enumObject={JobType}
      label="Type"
      placeholder="Set a type"
      required={required}
      icon={<AccessTimeIcon />}
    ></EnumSelect>
  );
};

export default JobTypeSelect;
