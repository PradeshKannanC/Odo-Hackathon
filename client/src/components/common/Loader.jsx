const Loader = ({ fullScreen = false }) => {
  const spinner = (
    <div className="h-10 w-10 rounded-full border-4 border-border/10 border-t-primary animate-spin" />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-6">{spinner}</div>;
};

export default Loader;
