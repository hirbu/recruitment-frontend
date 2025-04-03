import EducationItem from "@/interfaces/EducationItem";
import ExperienceItem from "@/interfaces/ExperienceItem";

interface ResumeData {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  website: string;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  other: string;
}

export default ResumeData;
