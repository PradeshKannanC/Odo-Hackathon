import { classNames } from "../../utils/helpers";

const Select = ({ label, error, className = "", id, options = [], placeholder, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text/80">
          {label}
        </label>
      )}
      <select
        id={id}
        className={classNames(
          "bg-surface text-text border border-border/10 rounded-lg px-3 py-2 outline-none",
          "transition-[border-color,box-shadow] duration-150",
          "focus:border-primary focus:ring-2 focus:ring-primary/20",
          error && "border-danger focus:border-danger focus:ring-danger/20",
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
};

export default Select;
