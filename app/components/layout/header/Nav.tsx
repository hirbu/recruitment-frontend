import NavItem from "@/app/components/layout/header/NavItem";
import links from "@/configs/links";

const Nav = () => (
  <nav className="flex flex-1 justify-between">
    <ul className="flex list-none gap-5">
      {links
        .filter((link) => !link.right)
        .map((link) => (
          <NavItem
            key={link.uri}
            title={link.title}
            uri={link.uri}
            icon={link.icon}
          />
        ))}
    </ul>
    <ul className="flex list-none gap-5">
      {links
        .filter((link) => link.right)
        .map((link) => (
          <NavItem
            key={link.uri}
            title={link.title}
            uri={link.uri}
            icon={link.icon}
          />
        ))}
    </ul>
  </nav>
);

export default Nav;
