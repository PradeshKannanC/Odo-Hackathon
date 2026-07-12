const SkeletonTable = ({ rows = 5, columns = 3 }) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border/10 animate-pulse">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center gap-4 px-4 py-3 border-b border-border/10 last:border-b-0"
        >
          {Array.from({ length: columns }).map((__, colIndex) => (
            <div key={colIndex} className="h-3 flex-1 bg-border/10 rounded" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
