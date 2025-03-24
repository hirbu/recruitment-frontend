import { EnumSelect } from "@/app/components/EnumSelect";
import ExperienceLevel from "@/enums/ExperienceLevel";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface ExperienceLevelSelectProps {
  experienceLevel: ExperienceLevel | undefined;
  setExperienceLevel: (value: ExperienceLevel) => void;
}

const ExperienceLevelSelect = ({
  experienceLevel,
  setExperienceLevel,
}: ExperienceLevelSelectProps) => {
  return (
    <EnumSelect
      value={experienceLevel}
      setValue={setExperienceLevel}
      enumObject={ExperienceLevel}
      label="Experience Level"
      placeholder="Set an experience level"
      required={true}
      icon={<AccessTimeIcon />}
    ></EnumSelect>
  );
};

export default ExperienceLevelSelect;
