import { TRIP_STATUS } from "../../constants/statusConstants";
import { formatStatusLabel } from "../../utils/helpers";
import { Card } from "../common";

const FilterBar = ({ filters, onChange }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="status" className="text-sm text-text/80">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="bg-surface text-text border border-border/10 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
          >
            <option value="">All statuses</option>
            {Object.values(TRIP_STATUS).map((status) => (
              <option key={status} value={status}>
                {formatStatusLabel(status)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="from" className="text-sm text-text/80">
            From
          </label>
          <input
            id="from"
            name="from"
            type="date"
            value={filters.from}
            onChange={handleChange}
            className="bg-surface text-text border border-border/10 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="to" className="text-sm text-text/80">
            To
          </label>
          <input
            id="to"
            name="to"
            type="date"
            value={filters.to}
            onChange={handleChange}
            className="bg-surface text-text border border-border/10 rounded-lg px-3 py-2 outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>
    </Card>
  );
};

export default FilterBar;
