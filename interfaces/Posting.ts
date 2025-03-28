import ExperienceLevel from "@/enums/ExperienceLevel";
import JobType from "@/enums/JobType";
import City from "@/interfaces/City";
import User from "@/interfaces/User";

export default interface Posting {
  id: number;
  title: string;
  description: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  cities: City[];
  tags: string[];
  fields: string[];
  owner: User;
  createdAt: string;
  updatedAt: string;
}
