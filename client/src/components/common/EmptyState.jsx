const EmptyState = ({ title = "Nothing here yet", message, action, icon }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 gap-2">
      {icon && <div className="mb-1">{icon}</div>}
      <h3 className="text-text font-semibold text-lg">{title}</h3>
      {message && <p className="text-text/60 text-sm max-w-sm">{message}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
};

export default EmptyState;
