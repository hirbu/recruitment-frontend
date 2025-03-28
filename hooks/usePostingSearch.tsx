import ExperienceLevel from "@/enums/ExperienceLevel";
import JobType from "@/enums/JobType";
import City from "@/interfaces/City";
import Posting from "@/interfaces/Posting";
import View from "@/interfaces/View";
import { useState } from "react";

interface UsePostingSearchProps {
  onViewUpdate: (view: View) => void;
  currentPage: number;
}

export const usePostingSearch = ({
  onViewUpdate,
  currentPage,
}: UsePostingSearchProps) => {
  const [postings, setPostings] = useState<Posting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPostings = async (
    debouncedTitle: string,
    jobType: JobType | undefined,
    experienceLevel: ExperienceLevel | undefined,
    cities: City[],
    userId?: string,
  ) => {
    setLoading(true);
    const url = "/api/postings?";
    const params = new URLSearchParams();

    if (debouncedTitle && debouncedTitle.length > 0) {
      params.append("title", encodeURI(debouncedTitle));
    }

    if (jobType) {
      params.append("jobType", encodeURI(jobType));
    }

    if (experienceLevel) {
      params.append("experienceLevel", encodeURI(experienceLevel));
    }

    if (cities.length > 0) {
      cities.map((city) =>
        params.append("cities.id[]", encodeURI(city.id.toString())),
      );
    }

    if (userId) {
      params.append("owner.id", encodeURI(userId));
    }

    params.append("page", encodeURI(currentPage.toString() ?? "1"));

    try {
      const response = await fetch(url + params.toString(), {
        headers: {
          Accept: "application/ld+json",
        },
      });

      const data = await response.json();
      setPostings(data.member as Posting[]);
      onViewUpdate(data.view as View);
    } finally {
      setLoading(false);
    }
  };

  return { postings, loading, fetchPostings };
};
