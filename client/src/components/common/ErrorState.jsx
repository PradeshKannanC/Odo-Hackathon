import Button from "./Button";

const ErrorState = ({ title = "Something went wrong", message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 gap-2">
      <h3 className="text-danger font-semibold text-lg">{title}</h3>
      {message && <p className="text-text/60 text-sm max-w-sm">{message}</p>}
      {onRetry && (
        <Button variant="outline" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
