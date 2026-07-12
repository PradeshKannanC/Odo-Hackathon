import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { Badge } from "../common";
import { formatStatusLabel } from "../../utils/helpers";
import NotificationBell from "./NotificationBell";
import AvatarMenu from "./AvatarMenu";
import { SearchIcon } from "./icons";

const ROLE_BADGE_VARIANT = {
  fleet_manager: "primary",
  dispatcher: "info",
  safety_officer: "warning",
  financial_analyst: "success",
};

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const openGlobalSearch = () => window.dispatchEvent(new Event("open-global-search"));

  return (
    <header className="flex items-center justify-between gap-3 bg-surface px-4 sm:px-6 py-4 border-b border-border/10">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="md:hidden text-text/70 hover:text-text transition-colors text-xl leading-none shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          ☰
        </button>
        <div className="text-text font-medium truncate hidden sm:block">
          Welcome{user?.name ? `, ${user.name}` : ""}
        </div>
      </div>

      <button
        type="button"
        onClick={openGlobalSearch}
        aria-label="Search"
        className="flex-1 max-w-md hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-border/10 text-text/45 hover:text-text/70 hover:border-border/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <SearchIcon width={16} height={16} className="shrink-0" />
        <span className="text-sm">Search...</span>
        <kbd className="ml-auto text-[10px] border border-border/20 rounded px-1.5 py-0.5">Ctrl K</kbd>
      </button>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={openGlobalSearch}
          aria-label="Search"
          className="md:hidden text-text/70 hover:text-text transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <SearchIcon width={20} height={20} />
        </button>

        {user?.role && (
          <Badge variant={ROLE_BADGE_VARIANT[user.role] || "neutral"} className="hidden sm:inline-flex">
            {formatStatusLabel(user.role)}
          </Badge>
        )}

        <NotificationBell />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-text/70 hover:text-text transition-colors text-lg leading-none rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <AvatarMenu />
      </div>
    </header>
  );
};

export default Navbar;
