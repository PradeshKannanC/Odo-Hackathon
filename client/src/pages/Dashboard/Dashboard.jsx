import { useCallback, useEffect, useState } from "react";
import dashboardService from "../../services/dashboardService";
import { useToast } from "../../hooks/useToast";
import { Table, Badge, SkeletonCard, SkeletonTable, ErrorState } from "../../components/common";
import StatCard from "../../components/dashboard/StatCard";
import FilterBar from "../../components/dashboard/FilterBar";
import DashboardCharts from "../../components/dashboard/DashboardCharts";
import FuelCostChart from "../../components/dashboard/FuelCostChart";
import ActivityTimeline from "../../components/dashboard/ActivityTimeline";
import {
  TruckIcon,
  CheckCircleIcon,
  WrenchIcon,
  GaugeIcon,
  RouteIcon,
  ClockIcon,
  UsersIcon,
  RefreshIcon,
} from "../../components/dashboard/icons";
import { formatStatusLabel } from "../../utils/helpers";
import { formatDateTime } from "../../utils/formatDate";

const DEFAULT_FILTERS = { status: "", from: "", to: "" };

const TRIP_STATUS_VARIANT = {
  DRAFT: "neutral",
  DISPATCHED: "info",
  COMPLETED: "success",
  CANCELLED: "danger",
};

const TRIP_COLUMNS = [
  {
    key: "status",
    label: "Status",
    render: (row) => (
      <Badge variant={TRIP_STATUS_VARIANT[row.status] || "neutral"}>
        {formatStatusLabel(row.status)}
      </Badge>
    ),
  },
  { key: "createdAt", label: "Created", render: (row) => formatDateTime(row.createdAt) },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [trips, setTrips] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [statsLoading, setStatsLoading] = useState(true);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [statsError, setStatsError] = useState(false);
  const [tripsError, setTripsError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { showToast } = useToast();

  const loadStats = useCallback(async () => {
    setStatsLoading(true);
    setStatsError(false);
    try {
      const { data } = await dashboardService.getStats();
      setStats(data.data);
      setLastUpdated(new Date());
    } catch (error) {
      setStatsError(true);
      showToast(error.response?.data?.message || "Failed to load dashboard stats", "danger");
    } finally {
      setStatsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadTrips = useCallback(async () => {
    setTripsLoading(true);
    setTripsError(false);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.from) params.from = filters.from;
      if (filters.to) params.to = filters.to;

      const { data } = await dashboardService.getRecentTrips(params);
      setTrips(data.data);
    } catch (error) {
      setTripsError(true);
      showToast(error.response?.data?.message || "Failed to load recent trips", "danger");
    } finally {
      setTripsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadStats(), loadTrips()]);
    setRefreshing(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="text-text/45 text-xs mt-1">
            {lastUpdated ? `Last updated ${formatDateTime(lastUpdated)}` : "Loading latest data..."}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/10 text-text/70 hover:text-text hover:bg-border/5 transition-colors disabled:opacity-50"
        >
          <RefreshIcon
            width={16}
            height={16}
            className={refreshing ? "animate-spin" : ""}
          />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>

      {statsError && !statsLoading ? (
        <ErrorState
          message="Couldn't load dashboard stats. Check your connection and try again."
          onRetry={loadStats}
        />
      ) : statsLoading || !stats ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard label="Active Vehicles" value={stats.vehicles.active} icon={TruckIcon} accent="primary" />
            <StatCard label="Available Vehicles" value={stats.vehicles.available} icon={CheckCircleIcon} accent="success" />
            <StatCard label="Vehicles in Maintenance" value={stats.vehicles.inMaintenance} icon={WrenchIcon} accent="warning" />
            <StatCard label="Fleet Utilization" value={stats.fleetUtilization} suffix="%" icon={GaugeIcon} accent="info" />
            <StatCard label="Active Trips" value={stats.trips.active} icon={RouteIcon} accent="primary" />
            <StatCard label="Pending Trips" value={stats.trips.pending} icon={ClockIcon} accent="warning" />
            <StatCard label="Drivers On Duty" value={stats.drivers.onDuty} icon={UsersIcon} accent="success" />
          </div>

          <DashboardCharts
            vehiclesByStatus={stats.vehicles.byStatus}
            tripsByStatus={stats.trips.byStatus}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <FuelCostChart />
            <div className="lg:col-span-2">
              <ActivityTimeline />
            </div>
          </div>
        </>
      )}

      <FilterBar filters={filters} onChange={setFilters} />

      <h2 className="text-lg font-semibold text-text mb-3">Recent Trips</h2>
      {tripsError && !tripsLoading ? (
        <ErrorState message="Couldn't load recent trips." onRetry={loadTrips} />
      ) : tripsLoading ? (
        <SkeletonTable rows={5} columns={2} />
      ) : (
        <Table columns={TRIP_COLUMNS} rows={trips} emptyMessage="No trips match these filters" />
      )}
    </div>
  );
};

export default Dashboard;
