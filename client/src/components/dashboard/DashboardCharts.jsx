import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Card } from "../common";
import { COLORS } from "../../constants/themeConstants";
import { formatStatusLabel } from "../../utils/helpers";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const legendTextColor = () =>
  document.documentElement.classList.contains("light") ? COLORS.background : "#FFFFFF";

const gridColor = () =>
  document.documentElement.classList.contains("light") ? "#1118271A" : "#FFFFFF1A";

const DashboardCharts = ({ vehiclesByStatus, tripsByStatus }) => {
  const textColor = legendTextColor();
  const hasVehicles = Object.values(vehiclesByStatus).some((v) => v > 0);
  const hasTrips = Object.values(tripsByStatus).some((v) => v > 0);

  const vehicleData = {
    labels: Object.keys(vehiclesByStatus).map(formatStatusLabel),
    datasets: [
      {
        data: Object.values(vehiclesByStatus),
        backgroundColor: [COLORS.success, COLORS.primary, COLORS.warning, COLORS.danger],
        borderColor: document.documentElement.classList.contains("light") ? "#FFFFFF" : "#1F2937",
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const tripData = {
    labels: Object.keys(tripsByStatus).map(formatStatusLabel),
    datasets: [
      {
        label: "Trips",
        data: Object.values(tripsByStatus),
        backgroundColor: COLORS.info,
        hoverBackgroundColor: COLORS.primary,
        borderRadius: 8,
        maxBarThickness: 42,
      },
    ],
  };

  const animation = { duration: 900, easing: "easeOutQuart" };

  const tooltipStyle = {
    backgroundColor: document.documentElement.classList.contains("light") ? "#1F2937" : "#0B1220",
    titleColor: "#FFFFFF",
    bodyColor: "#FFFFFF",
    padding: 10,
    cornerRadius: 8,
    displayColors: true,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <Card title="Fleet Status" className="lg:col-span-1">
        {hasVehicles ? (
          <Pie
            data={vehicleData}
            options={{
              animation,
              plugins: {
                legend: { position: "bottom", labels: { color: textColor, padding: 16 } },
                tooltip: tooltipStyle,
              },
            }}
          />
        ) : (
          <EmptyChartState message="No vehicle data yet" />
        )}
      </Card>

      <Card title="Trips by Status" className="lg:col-span-2">
        {hasTrips ? (
          <Bar
            data={tripData}
            options={{
              animation,
              plugins: { legend: { display: false }, tooltip: tooltipStyle },
              scales: {
                x: { ticks: { color: textColor }, grid: { display: false } },
                y: {
                  ticks: { color: textColor, precision: 0 },
                  grid: { color: gridColor() },
                },
              },
            }}
          />
        ) : (
          <EmptyChartState message="No trip data yet" />
        )}
      </Card>
    </div>
  );
};

const EmptyChartState = ({ message }) => (
  <div className="h-56 flex items-center justify-center text-text/50 text-sm">{message}</div>
);

export default DashboardCharts;
