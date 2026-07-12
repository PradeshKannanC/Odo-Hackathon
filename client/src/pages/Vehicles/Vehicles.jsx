import { useEffect, useState, useCallback } from "react";
import vehicleService from "../../services/vehicleService";

const STATUS_OPTIONS = ["AVAILABLE", "ON_TRIP", "IN_SHOP", "RETIRED"];

const STATUS_STYLES = {
  AVAILABLE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  ON_TRIP: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  IN_SHOP: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  RETIRED: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

const EMPTY_FORM = {
  registrationNo: "",
  vehicleName: "",
  vehicleType: "",
  capacity: "",
  odometer: "",
  acquisitionCost: "",
  status: "AVAILABLE",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${STATUS_STYLES[status] || STATUS_STYLES.RETIRED}`}
    >
      {status?.replace("_", " ")}
    </span>
  );
}

function VehicleFormModal({ initialData, onClose, onSaved }) {
  const isEdit = Boolean(initialData?._id);
  const [form, setForm] = useState(initialData || EMPTY_FORM);
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
      registrationNo: form.registrationNo.trim(),
      vehicleName: form.vehicleName.trim(),
      vehicleType: form.vehicleType.trim(),
      capacity: Number(form.capacity),
      odometer: Number(form.odometer) || 0,
      acquisitionCost: Number(form.acquisitionCost),
      status: form.status,
    };

    try {
      if (isEdit) {
        await vehicleService.update(initialData._id, payload);
      } else {
        await vehicleService.create(payload);
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
      <div className="w-full max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">
            {isEdit ? "Edit vehicle" : "Add vehicle"}
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
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Registration number
              </label>
              <input
                name="registrationNo"
                value={form.registrationNo}
                onChange={handleChange}
                placeholder="KL07AB1234"
                required
                disabled={isEdit}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Vehicle name
              </label>
              <input
                name="vehicleName"
                value={form.vehicleName}
                onChange={handleChange}
                placeholder="Ashok Leyland"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Vehicle type
              </label>
              <input
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                placeholder="Truck"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Capacity (kg)
              </label>
              <input
                name="capacity"
                type="number"
                min="1"
                value={form.capacity}
                onChange={handleChange}
                placeholder="5000"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Odometer (km)
              </label>
              <input
                name="odometer"
                type="number"
                min="0"
                value={form.odometer}
                onChange={handleChange}
                placeholder="45000"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Acquisition cost (₹)
              </label>
              <input
                name="acquisitionCost"
                type="number"
                min="0"
                value={form.acquisitionCost}
                onChange={handleChange}
                placeholder="1800000"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
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
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add vehicle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ vehicle, onClose, onConfirmed }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await vehicleService.remove(vehicle._id);
      onConfirmed();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not delete this vehicle.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-2">Delete vehicle</h2>
        <p className="text-sm text-slate-400 mb-4">
          Remove <span className="text-white">{vehicle.registrationNo}</span> from the
          registry? This can't be undone.
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

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [deletingVehicle, setDeletingVehicle] = useState(null);

  const fetchVehicles = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (typeFilter) params.vehicleType = typeFilter;
      if (statusFilter) params.status = statusFilter;

      const { data } = await vehicleService.getAll(params);
      setVehicles(data.data || []);
    } catch (err) {
      setLoadError(err?.response?.data?.message || "Could not load vehicles.");
    } finally {
      setLoading(false);
    }
  }, [search, typeFilter, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchVehicles, 300); // debounce search
    return () => clearTimeout(timer);
  }, [fetchVehicles]);

  const openCreate = () => {
    setEditingVehicle(null);
    setModalOpen(true);
  };

  const openEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setModalOpen(true);
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditingVehicle(null);
    fetchVehicles();
  };

  const handleDeleted = () => {
    setDeletingVehicle(null);
    fetchVehicles();
  };

  const vehicleTypes = [...new Set(vehicles.map((v) => v.vehicleType))].filter(Boolean);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Vehicles</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white"
        >
          + Add vehicle
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by registration, name, or type..."
          className="flex-1 min-w-[220px] rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All types</option>
          {vehicleTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-slate-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Registration</th>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Capacity</th>
              <th className="text-left px-4 py-3">Odometer</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  Loading vehicles...
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

            {!loading && !loadError && vehicles.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No vehicles yet. Click "Add vehicle" to register one.
                </td>
              </tr>
            )}

            {!loading &&
              !loadError &&
              vehicles.map((v) => (
                <tr key={v._id} className="text-slate-300 hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-white">{v.registrationNo}</td>
                  <td className="px-4 py-3">{v.vehicleName}</td>
                  <td className="px-4 py-3">{v.vehicleType}</td>
                  <td className="px-4 py-3">{v.capacity} kg</td>
                  <td className="px-4 py-3">{v.odometer?.toLocaleString()} km</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(v)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-sky-400 hover:bg-sky-500/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingVehicle(v)}
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
        <VehicleFormModal
          initialData={editingVehicle}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {deletingVehicle && (
        <DeleteConfirmModal
          vehicle={deletingVehicle}
          onClose={() => setDeletingVehicle(null)}
          onConfirmed={handleDeleted}
        />
      )}
    </div>
  );
};

export default Vehicles;
