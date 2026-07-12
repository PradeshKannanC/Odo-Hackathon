import { classNames } from "../../utils/helpers";

const Card = ({ children, className = "", title, actions }) => {
  return (
    <div
      className={classNames(
        "bg-surface rounded-xl p-5 shadow-md transition-shadow hover:shadow-lg",
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-text font-semibold text-lg">{title}</h3>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
