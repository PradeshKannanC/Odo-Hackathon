import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../routes/routesConfig";
import { classNames } from "../../utils/helpers";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-surface min-h-screen px-4 py-6">
      <div className="text-white text-xl font-semibold mb-8 px-2">TransitOps</div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              classNames(
                "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-primary text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
