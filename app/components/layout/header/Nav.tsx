import NavItem from "@/app/components/layout/header/NavItem";
import links from "@/configs/links";
import { useUser } from "@/contexts/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const { user, loading } = useUser();

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const linksToShow = links.filter((link) => {
    if (user) {
      return link.show.user;
    }

    return link.show.guest;
  });

  return (
    <>
      <div className="lg:hidden">
        <IconButton onClick={onOpen}>
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={onClose}>
          <ul className="flex w-62 list-none flex-col gap-5 p-5">
            {!loading &&
              linksToShow.map((link) => (
                <NavItem
                  key={link.uri}
                  title={link.title}
                  uri={link.uri}
                  icon={link.icon}
                  onClick={onClose}
                />
              ))}
          </ul>
        </Drawer>
      </div>
      <nav className="hidden flex-1 justify-between lg:flex">
        <ul className="flex list-none gap-5">
          {linksToShow.map((link) => (
            <NavItem
              key={link.uri}
              title={link.title}
              uri={link.uri}
              icon={link.icon}
            />
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
