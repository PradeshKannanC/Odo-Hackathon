import { classNames } from "../../utils/helpers";

const VARIANTS = {
  primary: "bg-primary text-white hover:opacity-90",
  success: "bg-success text-white hover:opacity-90",
  danger: "bg-danger text-white hover:opacity-90",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
};

const Button = ({ children, variant = "primary", className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={classNames(
        "px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
