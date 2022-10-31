import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

type NavLinkProps = {
  to: string;
  label: string;
};

/** Navigation link for the header. */
export const NavLink = ({ to, label }: NavLinkProps) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      className={classNames("mr-4", {
        "font-semibold underline": pathname === to,
      })}
    >
      {label}
    </Link>
  );
};
