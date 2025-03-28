import CitiesSelect from "@/app/components/postings/CitiesSelect";
import ExperienceLevelSelect from "@/app/components/postings/ExperienceLevelSelect";
import JobTypeSelect from "@/app/components/postings/JobTypeSelect";
import TitleInput from "@/app/components/postings/TitleInput";
import ExperienceLevel from "@/enums/ExperienceLevel";
import JobType from "@/enums/JobType";
import City from "@/interfaces/City";
import { Chip, Divider } from "@mui/material";

interface SearchSectionProps {
  title: string;
  onTitleChange: (title: string) => void;
  jobType: JobType | undefined;
  setJobType: (jobType: JobType | undefined) => void;
  experienceLevel: ExperienceLevel | undefined;
  setExperienceLevel: (experienceLevel: ExperienceLevel | undefined) => void;
  cities: City[];
  setCities: (cities: City[]) => void;
}

const SearchSection = ({
  title,
  onTitleChange,
  jobType,
  setJobType,
  experienceLevel,
  setExperienceLevel,
  cities,
  setCities,
}: SearchSectionProps) => (
  <>
    <Divider textAlign="left">
      <Chip label="SEARCH" size="medium" />
    </Divider>

    <div className="my-5 flex flex-col gap-5">
      <TitleInput title={title} setTitle={onTitleChange} />

      <JobTypeSelect jobType={jobType} setJobType={setJobType} />

      <ExperienceLevelSelect
        experienceLevel={experienceLevel}
        setExperienceLevel={setExperienceLevel}
      />

      <CitiesSelect cities={cities} setCities={setCities} />
    </div>
  </>
);

export default SearchSection;
