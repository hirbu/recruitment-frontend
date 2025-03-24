import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  uri: string;
  icon?: React.ReactNode;
}

const NavItem = ({ title, uri, icon }: NavItemProps) => {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={uri}
        className={`${
          pathname === uri ? "border-b-2 font-bold" : ""
        } flex items-end gap-1 uppercase`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};

export default NavItem;
