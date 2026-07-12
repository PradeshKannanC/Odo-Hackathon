import { classNames } from "../../utils/helpers";

const Input = ({ label, error, className = "", id, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm text-white/80">
          {label}
        </label>
      )}
      <input
        id={id}
        className={classNames(
          "bg-surface text-white border border-white/10 rounded-lg px-3 py-2 outline-none",
          "focus:border-primary transition-colors",
          error && "border-danger",
          className
        )}
        {...props}
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
};

export default Input;
