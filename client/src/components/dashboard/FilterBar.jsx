import { TRIP_STATUS } from "../../constants/statusConstants";
import { formatStatusLabel } from "../../utils/helpers";
import { Card, Select, Input } from "../common";

const STATUS_OPTIONS = Object.values(TRIP_STATUS).map((status) => ({
  value: status,
  label: formatStatusLabel(status),
}));

const FilterBar = ({ filters, onChange }) => {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-wrap items-end gap-4">
        <div className="w-40">
          <Select
            id="status"
            name="status"
            label="Status"
            value={filters.status}
            onChange={handleChange}
            placeholder="All statuses"
            options={STATUS_OPTIONS}
          />
        </div>

        <div className="w-40">
          <Input
            id="from"
            name="from"
            type="date"
            label="From"
            value={filters.from}
            onChange={handleChange}
          />
        </div>

        <div className="w-40">
          <Input
            id="to"
            name="to"
            type="date"
            label="To"
            value={filters.to}
            onChange={handleChange}
          />
        </div>
      </div>
    </Card>
  );
};

export default FilterBar;
