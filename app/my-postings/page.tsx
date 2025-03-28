"use client";

import ResultsSection from "@/app/ResultsSection";
import { useUser } from "@/contexts/UserContext";
import { usePagination } from "@/hooks/usePagination";
import { usePostingSearch } from "@/hooks/usePostingSearch";
import { CircularProgress, Container } from "@mui/material";
import { useEffect } from "react";

export default function MyPostings() {
  const { user, loading: userLoading } = useUser();

  const [pagination, updatePaginationWithView, updateCurrentPage] =
    usePagination();

  const {
    postings,
    loading: postingsLoading,
    fetchPostings,
  } = usePostingSearch({
    onViewUpdate: updatePaginationWithView,
    currentPage: pagination.current ?? 1,
  });

  const currentPage = pagination.current ?? 1;

  useEffect(() => {
    if (!userLoading && user?.id) {
      fetchPostings("", undefined, undefined, [], user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, userLoading, user?.id]);

  if (userLoading || postingsLoading) {
    return (
      <Container className="flex h-[50vh] flex-col items-center justify-center">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container className="font-sans">
      <ResultsSection
        loading={postingsLoading || userLoading}
        postings={postings}
        pagination={pagination}
        chipLabel="MY POSTINGS"
        updateCurrentPage={updateCurrentPage}
      />
    </Container>
  );
}
