import SkeletonPostings from "@/app/SkeletonPostings";
import PaginationButtons from "@/app/components/layout/pagination/PaginationButtons";
import PostingItem from "@/app/components/postings/PostingItem";
import Pagination from "@/interfaces/Pagination";
import Posting from "@/interfaces/Posting";
import { Chip, Divider } from "@mui/material";

interface ResultsSectionProps {
  loading: boolean;
  postings: Posting[];
  pagination: Pagination;
  chipLabel?: string;
  updateCurrentPage: (page: number) => void;
}

const ResultsSection = ({
  loading,
  postings,
  pagination,
  chipLabel = "RESULTS",
  updateCurrentPage,
}: ResultsSectionProps) => (
  <>
    <Divider textAlign="left">
      <Chip label={chipLabel} size="medium" />
    </Divider>

    {loading && <SkeletonPostings />}

    {!loading && (!postings || postings.length === 0) && (
      <div className="my-5">No results found.</div>
    )}

    {!loading && postings && postings.length > 0 && (
      <>
        <div className="my-5 grid gap-5 md:grid-cols-2">
          {postings.map((posting) => (
            <PostingItem key={posting.id} posting={posting} />
          ))}
        </div>

        <PaginationButtons
          pagination={pagination}
          updateCurrentPage={updateCurrentPage}
        />
      </>
    )}
  </>
);

export default ResultsSection;
