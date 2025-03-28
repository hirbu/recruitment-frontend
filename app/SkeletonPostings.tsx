import { Skeleton } from "@mui/material";

const SkeletonPosting = () => (
  <Skeleton className="h-55! transform-none! rounded"></Skeleton>
);

const SkeletonPostings = () => {
  return (
    <>
      <div className="my-5 grid gap-5 md:grid-cols-2">
        {[...Array(10)].map((_, index) => (
          <SkeletonPosting key={index} />
        ))}
      </div>
    </>
  );
};

export default SkeletonPostings;
