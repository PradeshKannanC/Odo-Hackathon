import { Card } from "../common";
import { classNames } from "../../utils/helpers";
import { useCountUp } from "../../hooks/useCountUp";

const ACCENT_STYLES = {
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
  info: "bg-info/15 text-info",
};

const StatCard = ({ label, value, suffix = "", icon: Icon, accent = "primary" }) => {
  const animatedValue = useCountUp(Number(value) || 0);

  return (
    <Card className="group hover:-translate-y-0.5 transition-transform duration-200">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-text/55 text-xs font-medium uppercase tracking-wide mb-2">
            {label}
          </div>
          <div className="text-3xl font-bold text-text tabular-nums">
            {animatedValue}
            {suffix}
          </div>
        </div>
        {Icon && (
          <div
            className={classNames(
              "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
              "transition-transform duration-200 group-hover:scale-110",
              ACCENT_STYLES[accent] || ACCENT_STYLES.primary
            )}
          >
            <Icon />
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
