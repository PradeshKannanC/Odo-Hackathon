import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useToast } from "../../hooks/useToast";
import userService from "../../services/userService";
import authService from "../../services/authService";
import { Card, Button, Input } from "../../components/common";
import { classNames } from "../../utils/helpers";

const TABS = ["Profile", "Change Password", "Theme", "About", "Security"];

const ProfileTab = () => {
  const { user, updateUser } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await userService.updateUser(user._id, form);
      updateUser(data.data);
      showToast("Profile updated successfully", "success");
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update profile", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Profile">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <Input
          id="name"
          label="Name"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          required
        />
        <Input
          id="email"
          type="email"
          label="Email"
          value={form.email}
          onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          required
        />
        <Button type="submit" loading={loading} className="self-start">
          {loading ? "Saving..." : "Save changes"}
        </Button>
      </form>
    </Card>
  );
};

const ChangePasswordTab = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      showToast("New password and confirmation do not match", "danger");
      return;
    }

    setLoading(true);
    try {
      await authService.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      showToast("Password updated successfully", "success");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update password", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Change Password">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
        <Input
          id="currentPassword"
          type="password"
          label="Current Password"
          value={form.currentPassword}
          onChange={(e) => setForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
          required
        />
        <Input
          id="newPassword"
          type="password"
          label="New Password"
          value={form.newPassword}
          onChange={(e) => setForm((prev) => ({ ...prev, newPassword: e.target.value }))}
          minLength={6}
          required
        />
        <Input
          id="confirmPassword"
          type="password"
          label="Confirm New Password"
          value={form.confirmPassword}
          onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          minLength={6}
          required
        />
        <Button type="submit" loading={loading} className="self-start">
          {loading ? "Updating..." : "Update password"}
        </Button>
      </form>
    </Card>
  );
};

const ThemeTab = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card title="Theme">
      <div className="flex gap-3">
        <Button variant={theme === "dark" ? "primary" : "outline"} onClick={() => setTheme("dark")}>
          Dark
        </Button>
        <Button variant={theme === "light" ? "primary" : "outline"} onClick={() => setTheme("light")}>
          Light
        </Button>
      </div>
    </Card>
  );
};

const AboutTab = () => (
  <Card title="About">
    <div className="text-text/80 text-sm flex flex-col gap-1">
      <p>TransitOps — Smart Transport Operations Platform</p>
      <p>Version 1.0.0</p>
      <p>Stack: React, Vite, Tailwind CSS, Express, MongoDB</p>
    </div>
  </Card>
);

const SecurityTab = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    showToast("Logged out successfully", "success");
    navigate("/login");
  };

  return (
    <Card title="Security">
      <div className="flex flex-col gap-4 max-w-sm">
        <div className="text-sm text-text/70">
          Signed in as <span className="text-text">{user?.email}</span> ({user?.role})
        </div>
        <Button variant="danger" className="self-start" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </Card>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text mb-6">Settings</h1>

      <div className="flex gap-2 mb-6 border-b border-border/10 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={classNames(
              "px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              activeTab === tab
                ? "border-primary text-primary"
                : "border-transparent text-text/60 hover:text-text"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Profile" && <ProfileTab />}
      {activeTab === "Change Password" && <ChangePasswordTab />}
      {activeTab === "Theme" && <ThemeTab />}
      {activeTab === "About" && <AboutTab />}
      {activeTab === "Security" && <SecurityTab />}
    </div>
  );
};

export default Settings;
