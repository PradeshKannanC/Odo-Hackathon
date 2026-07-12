import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserIcon, LogOutIcon } from "./icons";
import { formatStatusLabel } from "../../utils/helpers";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const AvatarMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
    navigate("/login");
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Account menu"
        className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold"
      >
        {getInitials(user?.name) || "?"}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border/10 rounded-xl shadow-lg z-50 overflow-hidden animate-scale-in">
            <div className="px-4 py-3 border-b border-border/10">
              <div className="text-text text-sm font-medium">{user?.name}</div>
              <div className="text-text/50 text-xs">{formatStatusLabel(user?.role)}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate("/settings");
              }}
              className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-text hover:bg-border/5 transition-colors"
            >
              <UserIcon width={16} height={16} />
              Profile
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 text-left px-4 py-2.5 text-sm text-danger hover:bg-border/5 transition-colors"
            >
              <LogOutIcon width={16} height={16} />
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarMenu;
