import { classNames } from "../../utils/helpers";

const VARIANTS = {
  primary: "bg-primary text-white hover:opacity-90",
  success: "bg-success text-white hover:opacity-90",
  danger: "bg-danger text-white hover:opacity-90",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
  neutral: "border border-border/10 text-text/70 hover:text-text hover:bg-border/5",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  loading = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classNames(
        "px-4 py-2 rounded-lg font-medium transition-[background-color,opacity,transform,box-shadow] duration-150",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "inline-flex items-center justify-center gap-2",
        "active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 rounded-full border-2 border-current/30 border-t-current animate-spin shrink-0" />
      )}
      {children}
    </button>
  );
};

export default Button;
