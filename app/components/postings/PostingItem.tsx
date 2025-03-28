import PostingChips from "@/app/components/postings/PostingChips";
import Posting from "@/interfaces/Posting";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Button } from "@mui/material";
import Link from "next/link";

interface PostingItemPropsInterface {
  posting: Posting;
}

const PostingItem = ({ posting }: PostingItemPropsInterface) => {
  return (
    <Link
      href={`/posting/${posting.id}`}
      className="flex cursor-pointer flex-col gap-2 rounded border border-[var(--mui-palette-grey-400)] px-2 py-3 hover:border-black"
    >
      <PostingChips posting={posting} />

      <h3 className="my-2 text-xl font-bold">{posting.title}</h3>

      <p className="mb-2 line-clamp-3 text-sm">{posting.description}</p>

      <Button size="small" color="inherit" variant="outlined" className="w-min">
        <div className="flex items-center gap-1 px-2 py-1">
          <span>Open</span>
          <KeyboardArrowRightIcon fontSize="small" />
        </div>
      </Button>
    </Link>
  );
};

export default PostingItem;
