import CitiesSelect from "@/app/components/postings/CitiesSelect";
import DescriptionInput from "@/app/components/postings/DescriptionInput";
import ExperienceLevelSelect from "@/app/components/postings/ExperienceLevelSelect";
import JobTypeSelect from "@/app/components/postings/JobTypeSelect";
import TagsModal from "@/app/components/postings/TagsModal";
import TagsSelect from "@/app/components/postings/TagsSelect";
import TitleInput from "@/app/components/postings/TitleInput";
import ExperienceLevel from "@/enums/ExperienceLevel";
import JobType from "@/enums/JobType";
import City from "@/interfaces/City";
import Tag from "@/interfaces/Tag";

interface RequiredFieldsProps {
  title: string;
  setTitle: (title: string) => void;
  jobType: JobType;
  setJobType: (jobType: JobType) => void;
  experienceLevel: ExperienceLevel;
  setExperienceLevel: (experienceLevel: ExperienceLevel) => void;
  cities: City[];
  setCities: (cities: City[]) => void;
  description: string;
  setDescription: (description: string) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const RequiredFields = ({
  title,
  setTitle,
  jobType,
  setJobType,
  experienceLevel,
  setExperienceLevel,
  cities,
  setCities,
  description,
  setDescription,
  tags,
  setTags,
}: RequiredFieldsProps) => {
  return (
    <div className="my-5 flex flex-col gap-5">
      <TitleInput title={title} setTitle={setTitle} required={true} />

      <JobTypeSelect
        jobType={jobType}
        setJobType={setJobType}
        required={true}
      />

      <ExperienceLevelSelect
        experienceLevel={experienceLevel}
        setExperienceLevel={setExperienceLevel}
        required={true}
      />

      <CitiesSelect cities={cities} setCities={setCities} required={true} />

      <DescriptionInput
        description={description}
        setDescription={setDescription}
        required={true}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-6">
          <TagsSelect tags={tags} setTags={setTags} required={true} />
        </div>
        <div className="flex-1">
          <TagsModal />
        </div>
      </div>
    </div>
  );
};

export default RequiredFields;
