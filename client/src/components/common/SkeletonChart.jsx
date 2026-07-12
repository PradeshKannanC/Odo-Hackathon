const SkeletonChart = ({ title = true }) => {
  return (
    <div className="bg-surface rounded-xl p-5 shadow-md">
      {title && <div className="skeleton-shimmer h-4 w-28 rounded mb-4" />}
      <div className="skeleton-shimmer h-56 w-full rounded-lg" />
    </div>
  );
};

export default SkeletonChart;
