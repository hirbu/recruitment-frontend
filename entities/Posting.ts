export default interface Posting {
  id: number;
  title: string;
  description: string;
  jobType: string;
  experienceLevel: string;
  cities: string[];
  tags: string[];
  fields: string[];
  createdAt: string;
  updatedAt: string;
}
