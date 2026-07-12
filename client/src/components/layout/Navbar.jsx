import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../common";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-surface px-6 py-4 border-b border-white/10">
      <div className="text-white font-medium">Welcome{user?.name ? `, ${user.name}` : ""}</div>

      <div className="flex items-center gap-3">
        <span className="text-white/60 text-sm">{user?.role}</span>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
