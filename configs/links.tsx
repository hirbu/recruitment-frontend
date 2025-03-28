import AddIcon from "@mui/icons-material/Add";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

const links = [
  {
    title: "All postings",
    uri: "/",
    icon: <FormatListBulletedIcon fontSize="small" />,
    show: {
      guest: true,
      user: true,
    },
  },
  {
    title: "Add posting",
    uri: "/add-posting",
    icon: <AddIcon fontSize="small" />,
    show: {
      guest: false,
      user: true,
    },
  },
  {
    title: "My postings",
    uri: "/my-postings",
    icon: <KeyboardDoubleArrowRightIcon fontSize="small" />,
    show: {
      guest: false,
      user: true,
    },
  },
  {
    title: "Login",
    uri: "/account/login",
    icon: <PersonIcon fontSize="small" />,
    show: {
      guest: true,
      user: false,
    },
  },
  {
    title: "Logout",
    uri: "/account/logout",
    icon: <LogoutIcon fontSize="small" />,
    show: {
      guest: false,
      user: true,
    },
  },
];

export default links;
