import { Card, EmptyState } from "../common";
import { FuelIcon } from "./icons";

// The Fuel module (and its cost data) hasn't been built yet - FuelLog is an
// empty placeholder schema - so this renders its real empty state rather
// than fabricating numbers. Swap in a real chart once fuel logging exists.
const FuelCostChart = () => {
  return (
    <Card title="Fuel Cost">
      <EmptyState
        title="No fuel cost data yet"
        message="This chart will populate automatically once fuel logs are recorded."
        icon={
          <div className="h-11 w-11 mx-auto rounded-xl bg-info/15 text-info flex items-center justify-center">
            <FuelIcon />
          </div>
        }
      />
    </Card>
  );
};

export default FuelCostChart;
