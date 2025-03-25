import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  uri: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const NavItem = ({ title, uri, icon, onClick }: NavItemProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={uri}
        onClick={onClick}
        className={`${
          pathname === uri ? "font-bold md:border-b-2" : ""
        } flex items-end gap-1 uppercase`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};

export default NavItem;
