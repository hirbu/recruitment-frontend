import { EnumSelect } from "@/app/components/EnumSelect";
import ExperienceLevel from "@/enums/ExperienceLevel";
import ScienceIcon from "@mui/icons-material/Science";

interface ExperienceLevelSelectProps {
  experienceLevel: ExperienceLevel | undefined;
  setExperienceLevel: (value: ExperienceLevel) => void;
  required?: boolean;
}

const ExperienceLevelSelect = ({
  experienceLevel,
  setExperienceLevel,
  required = false,
}: ExperienceLevelSelectProps) => {
  return (
    <EnumSelect
      value={experienceLevel}
      setValue={setExperienceLevel}
      enumObject={ExperienceLevel}
      label="Experience Level"
      placeholder="Set an experience level"
      required={required}
      icon={<ScienceIcon />}
    ></EnumSelect>
  );
};

export default ExperienceLevelSelect;
