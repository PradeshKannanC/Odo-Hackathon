import { useEffect, useState, useCallback } from "react";
import tripService from "../../services/tripService";
import vehicleService from "../../services/vehicleService";
import driverService from "../../services/driverService";

const STATUS_OPTIONS = ["DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"];

const STATUS_STYLES = {
  DRAFT: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  DISPATCHED: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  COMPLETED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  CANCELLED: "bg-red-500/15 text-red-400 border-red-500/30",
};

const EMPTY_FORM = {
  tripId: "",
  vehicle: "",
  driver: "",
  source: "",
  destination: "",
  cargoWeight: "",
  plannedDistance: "",
  scheduledDate: "",
  status: "DRAFT",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${STATUS_STYLES[status] || STATUS_STYLES.DRAFT}`}
    >
      {status}
    </span>
  );
}

function toFormValues(trip) {
  if (!trip) return EMPTY_FORM;
  return {
    tripId: trip.tripId || "",
    vehicle: trip.vehicle?._id || trip.vehicle || "",
    driver: trip.driver?._id || trip.driver || "",
    source: trip.source || "",
    destination: trip.destination || "",
    cargoWeight: trip.cargoWeight ?? "",
    plannedDistance: trip.plannedDistance ?? "",
    scheduledDate: trip.scheduledDate ? trip.scheduledDate.slice(0, 10) : "",
    status: trip.status || "DRAFT",
  };
}

function TripFormModal({ initialData, vehicles, drivers, onClose, onSaved }) {
  const isEdit = Boolean(initialData?._id);
  const [form, setForm] = useState(toFormValues(initialData));
  const [errors, setErrors] = useState([]);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSaving(true);

    const payload = {
      tripId: form.tripId.trim(),
      vehicle: form.vehicle,
      driver: form.driver,
      source: form.source.trim(),
      destination: form.destination.trim(),
      cargoWeight: Number(form.cargoWeight),
      plannedDistance: Number(form.plannedDistance),
      scheduledDate: form.scheduledDate || undefined,
      status: form.status,
    };

    try {
      if (isEdit) {
        await tripService.update(initialData._id, payload);
      } else {
        await tripService.create(payload);
      }
      onSaved();
    } catch (err) {
      const res = err?.response?.data;
      if (res?.errors) setErrors(res.errors);
      else setErrors([res?.message || "Something went wrong. Please try again."]);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">
            {isEdit ? "Edit trip" : "Add trip"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            <ul className="list-disc list-inside space-y-0.5">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1">Trip ID</label>
              <input
                name="tripId"
                value={form.tripId}
                onChange={handleChange}
                placeholder="TRIP-1001"
                required
                disabled={isEdit}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Vehicle</label>
              <select
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select vehicle</option>
                {vehicles.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.registrationNo} - {v.vehicleName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Driver</label>
              <select
                name="driver"
                value={form.driver}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="">Select driver</option>
                {drivers.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Source</label>
              <input
                name="source"
                value={form.source}
                onChange={handleChange}
                placeholder="Bangalore"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Destination</label>
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Chennai"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Cargo weight (kg)
              </label>
              <input
                name="cargoWeight"
                type="number"
                min="0"
                value={form.cargoWeight}
                onChange={handleChange}
                placeholder="2000"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Planned distance (km)
              </label>
              <input
                name="plannedDistance"
                type="number"
                min="0"
                value={form.plannedDistance}
                onChange={handleChange}
                placeholder="350"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Scheduled date
              </label>
              <input
                name="scheduledDate"
                type="date"
                value={form.scheduledDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add trip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ trip, onClose, onConfirmed }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await tripService.remove(trip._id);
      onConfirmed();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not delete this trip.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-2">Delete trip</h2>
        <p className="text-sm text-slate-400 mb-4">
          Remove <span className="text-white">{trip.tripId}</span>? This can't be undone.
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-500 text-white disabled:opacity-60"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [deletingTrip, setDeletingTrip] = useState(null);

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const { data } = await tripService.getAll();
      setTrips(data.data || []);
    } catch (err) {
      setLoadError(err?.response?.data?.message || "Could not load trips.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchLookups = useCallback(async () => {
    try {
      const [vehicleRes, driverRes] = await Promise.all([
        vehicleService.getAll({ limit: 100 }),
        driverService.getAll(),
      ]);
      setVehicles(vehicleRes.data.data || []);
      setDrivers(driverRes.data.data || []);
    } catch {
      // Vehicle/driver lookups are only needed for the create/edit form -
      // the trip list itself still works if these fail to load.
    }
  }, []);

  useEffect(() => {
    fetchTrips();
    fetchLookups();
  }, [fetchTrips, fetchLookups]);

  const openCreate = () => {
    setEditingTrip(null);
    setModalOpen(true);
  };

  const openEdit = (trip) => {
    setEditingTrip(trip);
    setModalOpen(true);
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditingTrip(null);
    fetchTrips();
  };

  const handleDeleted = () => {
    setDeletingTrip(null);
    fetchTrips();
  };

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch =
      !search.trim() ||
      trip.tripId?.toLowerCase().includes(search.toLowerCase()) ||
      trip.source?.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Trips</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white"
        >
          + Add trip
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by trip ID, source, or destination..."
          className="flex-1 min-w-[220px] rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-slate-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Trip</th>
              <th className="text-left px-4 py-3">Vehicle</th>
              <th className="text-left px-4 py-3">Driver</th>
              <th className="text-left px-4 py-3">Route</th>
              <th className="text-left px-4 py-3">Distance</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  Loading trips...
                </td>
              </tr>
            )}

            {!loading && loadError && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-red-400">
                  {loadError}
                </td>
              </tr>
            )}

            {!loading && !loadError && filteredTrips.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No trips yet. Click "Add trip" to dispatch one.
                </td>
              </tr>
            )}

            {!loading &&
              !loadError &&
              filteredTrips.map((trip) => (
                <tr key={trip._id} className="text-slate-300 hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-white">{trip.tripId}</td>
                  <td className="px-4 py-3">{trip.vehicle?.registrationNo || "-"}</td>
                  <td className="px-4 py-3">{trip.driver?.name || "-"}</td>
                  <td className="px-4 py-3">
                    {trip.source} &rarr; {trip.destination}
                  </td>
                  <td className="px-4 py-3">{trip.plannedDistance} km</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={trip.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(trip)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-sky-400 hover:bg-sky-500/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingTrip(trip)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-red-400 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <TripFormModal
          initialData={editingTrip}
          vehicles={vehicles}
          drivers={drivers}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {deletingTrip && (
        <DeleteConfirmModal
          trip={deletingTrip}
          onClose={() => setDeletingTrip(null)}
          onConfirmed={handleDeleted}
        />
      )}
    </div>
  );
};

export default Trips;
