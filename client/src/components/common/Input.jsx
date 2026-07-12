import { classNames } from "../../utils/helpers";

const Input = ({ label, error, className = "", id, rightElement, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text/80">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={classNames(
            "w-full bg-surface text-text border border-border/10 rounded-lg px-3 py-2 outline-none",
            "transition-[border-color,box-shadow] duration-150",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error && "border-danger focus:border-danger focus:ring-danger/20",
            rightElement && "pr-10",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && <span className="text-sm text-danger animate-fade-in">{error}</span>}
    </div>
  );
};

export default Input;
