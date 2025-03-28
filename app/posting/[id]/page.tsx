import PostingChips from "@/app/components/postings/PostingChips";
import Posting from "@/interfaces/Posting";
import { Container } from "@mui/material";
import ApplicationSection from "./ApplicationSection";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/postings/${id}.json`,
  );
  const posting = (await response.json()) as Posting;

  return (
    <>
      <Container
        className="relative font-sans"
        vocab="https://schema.org/"
        typeof="JobPosting"
      >
        <PostingChips posting={posting} seo={true} />

        <h2 property="title" className="my-3 text-3xl font-bold">
          {posting.title}
        </h2>

        <p property="description" className="my-2 text-sm whitespace-pre-wrap">
          {posting.description.trim()}
        </p>

        <ApplicationSection posting={posting} />
      </Container>
    </>
  );
}
