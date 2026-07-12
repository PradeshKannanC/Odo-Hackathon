// Converts SNAKE_CASE status values into readable labels (e.g. "ON_TRIP" -> "On Trip")
export const formatStatusLabel = (status) => {
  if (!status) return "";
  return status
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const classNames = (...classes) => classes.filter(Boolean).join(" ");
