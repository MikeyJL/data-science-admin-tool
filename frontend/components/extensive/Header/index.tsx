import { NavLink } from "./NavLink";

/** Main header with controls. */
export const Header = () => {
  return (
    <div className="py-8 container mx-auto flex justify-between items-end border-b-2 mb-8">
      <div>
        <p className="text-4xl font-bold">DSAT</p>
        <p className="uppercase font-semibold">A simple data tool</p>
      </div>

      <div>
        <NavLink label="Dashboard" to="/" />
        <NavLink label="Profile" to="/profile" />
        <a href="/admin">Admin</a>
      </div>
    </div>
  );
};
