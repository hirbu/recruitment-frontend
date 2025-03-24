import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import PersonIcon from "@mui/icons-material/Person";

const links = [
  {
    title: "All postings",
    uri: "/",
    icon: <FormatListBulletedIcon />,
  },
  {
    title: "Add posting",
    uri: "/add-posting",
    icon: <AddIcon />,
  },
  {
    title: "My postings",
    uri: "/my-postings",
    icon: <KeyboardDoubleArrowRightIcon />,
  },
  {
    title: "Account",
    uri: "/account/login",
    icon: <PersonIcon />,
    right: true,
  },
];

export default links;
