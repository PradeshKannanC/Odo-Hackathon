const SkeletonCard = () => {
  return (
    <div className="bg-surface rounded-xl p-5 shadow-md animate-pulse">
      <div className="flex items-start justify-between">
        <div>
          <div className="h-3 w-24 bg-border/10 rounded mb-4" />
          <div className="h-8 w-16 bg-border/10 rounded" />
        </div>
        <div className="h-11 w-11 rounded-xl bg-border/10 shrink-0" />
      </div>
    </div>
  );
};

export default SkeletonCard;
