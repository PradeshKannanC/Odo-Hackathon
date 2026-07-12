import { useToast } from "../../hooks/useToast";
import { classNames } from "../../utils/helpers";

const TYPE_STYLES = {
  info: "bg-surface border-border/10",
  success: "bg-surface border-success",
  danger: "bg-surface border-danger",
};

const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={classNames(
            "min-w-[240px] max-w-sm px-4 py-3 rounded-lg border text-text shadow-lg cursor-pointer",
            "animate-toast-in hover:shadow-xl transition-shadow",
            TYPE_STYLES[toast.type] || TYPE_STYLES.info
          )}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default Toast;
