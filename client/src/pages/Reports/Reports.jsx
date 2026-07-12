import { useEffect, useState } from "react";
import reportService from "../../services/reportService";
import { Card, Table, ErrorState } from "../../components/common";
import { formatStatusLabel } from "../../utils/helpers";

const formatCurrency = (value) => `₹${(value || 0).toLocaleString()}`;

const STATUS_ROWS = (byStatus) =>
  Object.entries(byStatus || {}).map(([status, count]) => ({ status, count }));

const STATUS_COLUMNS = [
  { key: "status", label: "Status", render: (row) => formatStatusLabel(row.status) },
  { key: "count", label: "Count" },
];

const EXPENSE_COLUMNS = (unitLabel) => [
  { key: "registrationNo", label: "Vehicle", render: (row) => row.registrationNo || "Unknown" },
  { key: "vehicleName", label: "Model" },
  ...(unitLabel ? [{ key: "liters", label: "Liters", render: (row) => row.liters ?? "-" }] : []),
  { key: "cost", label: "Cost", render: (row) => formatCurrency(row.cost) },
];

const Reports = () => {
  const [summary, setSummary] = useState(null);
  const [expenses, setExpenses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(false);
    try {
      const [summaryRes, expenseRes] = await Promise.all([
        reportService.getSummary(),
        reportService.getExpenses(),
      ]);
      setSummary(summaryRes.data.data);
      setExpenses(expenseRes.data.data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (error && !loading) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-text mb-6">Reports</h1>
        <ErrorState message="Couldn't load reports. Check your connection and try again." onRetry={load} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text mb-6">Reports</h1>

      {loading || !summary || !expenses ? (
        <p className="text-text/50 text-sm">Loading reports...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <div className="text-text/55 text-xs font-medium uppercase tracking-wide mb-2">
                Total Vehicles
              </div>
              <div className="text-2xl font-bold text-text">{summary.vehicles.total}</div>
            </Card>
            <Card>
              <div className="text-text/55 text-xs font-medium uppercase tracking-wide mb-2">
                Total Drivers
              </div>
              <div className="text-2xl font-bold text-text">{summary.drivers.total}</div>
            </Card>
            <Card>
              <div className="text-text/55 text-xs font-medium uppercase tracking-wide mb-2">
                Total Trips
              </div>
              <div className="text-2xl font-bold text-text">{summary.trips.total}</div>
            </Card>
            <Card>
              <div className="text-text/55 text-xs font-medium uppercase tracking-wide mb-2">
                Total Expense
              </div>
              <div className="text-2xl font-bold text-text">
                {formatCurrency(expenses.totalExpense)}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card title="Vehicles by Status">
              <Table columns={STATUS_COLUMNS} rows={STATUS_ROWS(summary.vehicles.byStatus)} />
            </Card>
            <Card title="Drivers by Status">
              <Table columns={STATUS_COLUMNS} rows={STATUS_ROWS(summary.drivers.byStatus)} />
            </Card>
            <Card title="Trips by Status">
              <Table columns={STATUS_COLUMNS} rows={STATUS_ROWS(summary.trips.byStatus)} />
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Card>
              <div className="text-text/55 text-xs font-medium uppercase tracking-wide mb-2">
                Maintenance Cost ({summary.maintenance.count} records)
              </div>
              <div className="text-2xl font-bold text-text">
                {formatCurrency(summary.maintenance.totalCost)}
              </div>
            </Card>
            <Card>
              <div className="text-text/55 text-xs font-medium uppercase tracking-wide mb-2">
                Fuel Cost ({summary.fuel.count} logs, {summary.fuel.totalLiters} L)
              </div>
              <div className="text-2xl font-bold text-text">
                {formatCurrency(summary.fuel.totalCost)}
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Maintenance Cost by Vehicle">
              <Table
                columns={EXPENSE_COLUMNS(false)}
                rows={expenses.maintenanceByVehicle}
                emptyMessage="No maintenance costs recorded yet"
              />
            </Card>
            <Card title="Fuel Cost by Vehicle">
              <Table
                columns={EXPENSE_COLUMNS(true)}
                rows={expenses.fuelByVehicle}
                emptyMessage="No fuel costs recorded yet"
              />
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
