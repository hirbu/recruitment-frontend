import Posting from "@/interfaces/Posting";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import ScienceIcon from "@mui/icons-material/Science";
import { Chip } from "@mui/material";
import moment from "moment";

interface PostingChipsProps {
  posting: Posting;
  seo?: boolean;
}

const PostingChips = ({ posting, seo = false }: PostingChipsProps) => (
  <div className="flex flex-wrap gap-3">
    <Chip
      icon={<Grid3x3Icon />}
      label={posting.id}
      size="small"
      property={seo ? "identifier" : undefined}
    />
    <Chip
      icon={<PersonIcon />}
      label={posting.owner.name}
      size="small"
      property={seo ? "owner" : undefined}
    />
    <Chip
      icon={<CalendarTodayIcon />}
      label={moment(posting.createdAt).fromNow()}
      size="small"
      property={seo ? "datePosted" : undefined}
    />
    <Chip
      icon={<LocationOnIcon />}
      label={posting.cities.map((city) => city.name).join(" | ")}
      size="small"
      property={seo ? "jobLocation" : undefined}
    />
    <Chip
      icon={<ScienceIcon />}
      label={posting.experienceLevel}
      className="capitalize"
      size="small"
      property={seo ? "experienceRequirements" : undefined}
    />
    <Chip
      icon={<AccessTimeIcon />}
      label={posting.jobType}
      className="capitalize"
      size="small"
      property={seo ? "employmentType" : undefined}
    />
  </div>
);

export default PostingChips;
