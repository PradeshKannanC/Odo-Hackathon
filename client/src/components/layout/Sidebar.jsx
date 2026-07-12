import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../../routes/routesConfig";
import { classNames } from "../../utils/helpers";
import { useAuth } from "../../hooks/useAuth";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

const Sidebar = ({ isOpen = false, onClose, collapsed = false, onToggleCollapse }) => {
  const { user } = useAuth();
  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.allowedRoles || item.allowedRoles.includes(user?.role)
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={classNames(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-surface py-6",
          "transform transition-[transform,width] duration-300 ease-in-out",
          "md:static md:translate-x-0 md:min-h-screen",
          isOpen ? "translate-x-0 w-64 px-4" : "-translate-x-full w-64 px-4",
          collapsed ? "md:w-20 md:px-2" : "md:w-64 md:px-4"
        )}
      >
        <div
          className={classNames(
            "flex items-center gap-2 mb-8 px-2",
            collapsed && "md:justify-center md:px-0"
          )}
        >
          <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
            T
          </div>
          <span
            className={classNames(
              "text-text text-xl font-semibold overflow-hidden whitespace-nowrap transition-all duration-200",
              collapsed ? "md:w-0 md:opacity-0" : "w-auto opacity-100"
            )}
          >
            TransitOps
          </span>
        </div>

        <nav className="flex flex-col gap-1.5">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={onClose}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  classNames(
                    "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium",
                    "transition-all duration-150 hover:translate-x-0.5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    collapsed && "md:justify-center md:px-0",
                    isActive
                      ? "bg-primary text-white"
                      : "text-text/70 hover:bg-border/5 hover:text-text"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={classNames(
                        "absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-white transition-opacity duration-150",
                        isActive ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {Icon && (
                      <Icon className="shrink-0 transition-transform duration-150 group-hover:scale-110" />
                    )}
                    <span
                      className={classNames(
                        "overflow-hidden whitespace-nowrap transition-all duration-200",
                        collapsed ? "md:w-0 md:opacity-0" : "w-auto opacity-100"
                      )}
                    >
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={classNames(
            "hidden md:flex items-center gap-2 mt-auto px-3 py-2.5 rounded-lg text-sm font-medium",
            "text-text/60 hover:bg-border/5 hover:text-text transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            collapsed && "justify-center px-0"
          )}
        >
          {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
