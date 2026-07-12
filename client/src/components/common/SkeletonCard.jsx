const SkeletonCard = () => {
  return (
    <div className="bg-surface rounded-xl p-5 shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <div className="skeleton-shimmer h-3 w-24 rounded mb-4" />
          <div className="skeleton-shimmer h-8 w-16 rounded" />
        </div>
        <div className="skeleton-shimmer h-11 w-11 rounded-xl shrink-0" />
      </div>
    </div>
  );
};

export default SkeletonCard;
