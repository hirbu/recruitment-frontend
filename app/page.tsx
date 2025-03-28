"use client";

import ResultsSection from "@/app/ResultsSection";
import SearchSection from "@/app/SearchSection";
import ExperienceLevel from "@/enums/ExperienceLevel";
import JobType from "@/enums/JobType";
import { usePagination } from "@/hooks/usePagination";
import { usePostingSearch } from "@/hooks/usePostingSearch";
import City from "@/interfaces/City";
import { Container, debounce } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [debouncedTitle, setDebouncedTitle] = useState("");
  const [jobType, setJobType] = useState<JobType | undefined>(undefined);
  const [experienceLevel, setExperienceLevel] = useState<
    ExperienceLevel | undefined
  >(undefined);
  const [cities, setCities] = useState<City[]>([]);

  const [pagination, updatePaginationWithView, updateCurrentPage] =
    usePagination();
  const { postings, loading, fetchPostings } = usePostingSearch({
    onViewUpdate: updatePaginationWithView,
    currentPage: pagination.current ?? 1,
  });

  const debouncedSetTitle = useCallback(
    debounce((value: string) => {
      setDebouncedTitle(value);
    }, 500),
    [],
  );

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    debouncedSetTitle(newTitle);
  };

  useEffect(() => {
    fetchPostings(debouncedTitle, jobType, experienceLevel, cities);
  }, [
    pagination.current ?? 1,
    debouncedTitle,
    jobType,
    experienceLevel,
    cities,
  ]);

  return (
    <Container className="font-sans">
      <SearchSection
        title={title}
        onTitleChange={handleTitleChange}
        jobType={jobType}
        setJobType={setJobType}
        experienceLevel={experienceLevel}
        setExperienceLevel={setExperienceLevel}
        cities={cities}
        setCities={setCities}
      />
      <ResultsSection
        loading={loading}
        postings={postings}
        pagination={pagination}
        updateCurrentPage={updateCurrentPage}
      />
    </Container>
  );
}
