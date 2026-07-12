import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../routes/routesConfig";
import { useAuth } from "../../hooks/useAuth";
import { EmptyState } from "../common";

const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    const handleOpenRequest = () => setIsOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-global-search", handleOpenRequest);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-global-search", handleOpenRequest);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) setQuery("");
  }, [isOpen]);

  if (!isOpen) return null;

  const results = NAV_ITEMS.filter(
    (item) =>
      (!item.allowedRoles || item.allowedRoles.includes(user?.role)) &&
      item.label.toLowerCase().includes(query.toLowerCase())
  );

  const goTo = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 pt-24 px-4 animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
      <div className="relative bg-surface rounded-xl w-full max-w-md shadow-lg overflow-hidden animate-scale-in">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to a page..."
          className="w-full bg-transparent text-text px-4 py-3 border-b border-border/10 outline-none"
        />
        {results.length === 0 ? (
          <EmptyState title="No matches" message="Try a different page name." />
        ) : (
          <ul className="max-h-72 overflow-y-auto">
            {results.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => goTo(item.path)}
                  className="w-full text-left px-4 py-3 text-text hover:bg-border/5 transition-colors focus-visible:outline-none focus-visible:bg-border/5"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;
