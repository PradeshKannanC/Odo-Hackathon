import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { Button, Input, Modal } from "../../components/common";
import { isValidEmail, isRequired } from "../../utils/validators";
import { TruckIcon, RouteIcon, GaugeIcon } from "../../components/dashboard/icons";

const EyeIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1.5 12S5 5 12 5s10.5 7 10.5 7-3.5 7-10.5 7S1.5 12 1.5 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3l18 18" />
    <path d="M10.6 5.1A10.9 10.9 0 0 1 12 5c7 0 10.5 7 10.5 7a17.6 17.6 0 0 1-3.1 4.1M6.5 6.9C3.4 8.9 1.5 12 1.5 12s3.5 7 10.5 7c1.4 0 2.7-.3 3.9-.7" />
    <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
  </svg>
);

const FEATURES = [
  { icon: TruckIcon, text: "Real-time fleet visibility across every vehicle" },
  { icon: RouteIcon, text: "Trip and dispatch tracking, end to end" },
  { icon: GaugeIcon, text: "Live utilization and performance metrics" },
];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const validate = () => {
    const nextErrors = {};
    if (!isRequired(formData.email)) {
      nextErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (!isRequired(formData.password)) {
      nextErrors.password = "Password is required";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login({ ...formData, rememberMe });
      showToast("Logged in successfully", "success");
      navigate("/");
    } catch (error) {
      const message = error.response
        ? error.response.data?.message || "Invalid email or password. Please try again."
        : "Unable to reach the server. Please check your connection and try again.";
      showToast(message, "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Branding panel - desktop only */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0B1220] px-12 py-16 flex-col justify-between">
        <div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-info/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shrink-0">
            T
          </div>
          <span className="text-white text-xl font-semibold">TransitOps</span>
        </div>

        <div className="relative flex flex-col gap-8 max-w-md">
          <h1 className="text-white text-4xl font-bold leading-tight">
            Smart transport operations, all in one place.
          </h1>
          <div className="flex flex-col gap-5">
            {FEATURES.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/10 text-primary flex items-center justify-center shrink-0">
                  <Icon width={18} height={18} />
                </div>
                <span className="text-white/70 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-white/40 text-xs">
          &copy; {new Date().getFullYear()} TransitOps. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shrink-0">
              T
            </div>
            <span className="text-text text-xl font-semibold">TransitOps</span>
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-text">Welcome back</h2>
            <p className="text-text/50 text-sm mt-1">Sign in to manage your fleet operations.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="current-password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-text/40 hover:text-text/70 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-text/70 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-primary rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setForgotOpen(true)}
                className="text-sm text-primary hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" loading={loading} className="w-full mt-1">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>
      </div>

      <Modal
        isOpen={forgotOpen}
        onClose={() => setForgotOpen(false)}
        title="Forgot your password?"
        footer={<Button onClick={() => setForgotOpen(false)}>Got it</Button>}
      >
        <p className="text-sm text-text/70">
          Self-service password reset isn&apos;t available yet. Please contact your Fleet
          Manager or system administrator to reset your password.
        </p>
      </Modal>
    </div>
  );
};

export default Login;
