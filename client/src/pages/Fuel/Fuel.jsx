import { useEffect, useState, useCallback } from "react";
import fuelService from "../../services/fuelService";
import vehicleService from "../../services/vehicleService";

const EMPTY_FORM = {
  vehicle: "",
  liters: "",
  cost: "",
  odometerReading: "",
  date: "",
};

function toFormValues(log) {
  if (!log) return EMPTY_FORM;
  return {
    vehicle: log.vehicle?._id || log.vehicle || "",
    liters: log.liters ?? "",
    cost: log.cost ?? "",
    odometerReading: log.odometerReading ?? "",
    date: log.date ? log.date.slice(0, 10) : "",
  };
}

function FuelFormModal({ initialData, vehicles, onClose, onSaved }) {
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
      vehicle: form.vehicle,
      liters: Number(form.liters),
      cost: Number(form.cost),
      odometerReading: form.odometerReading === "" ? undefined : Number(form.odometerReading),
      date: form.date,
    };

    try {
      if (isEdit) {
        await fuelService.update(initialData._id, payload);
      } else {
        await fuelService.create(payload);
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
            {isEdit ? "Edit fuel log" : "Add fuel log"}
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
              <label className="block text-xs font-medium text-slate-400 mb-1">Liters</label>
              <input
                name="liters"
                type="number"
                min="0"
                value={form.liters}
                onChange={handleChange}
                placeholder="45"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Cost (₹)</label>
              <input
                name="cost"
                type="number"
                min="0"
                value={form.cost}
                onChange={handleChange}
                placeholder="4500"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Odometer (km)
              </label>
              <input
                name="odometerReading"
                type="number"
                min="0"
                value={form.odometerReading}
                onChange={handleChange}
                placeholder="45000"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
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
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ log, onClose, onConfirmed }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await fuelService.remove(log._id);
      onConfirmed();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not delete this fuel log.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-2">Delete fuel log</h2>
        <p className="text-sm text-slate-400 mb-4">
          Remove this fuel log for{" "}
          <span className="text-white">{log.vehicle?.registrationNo}</span>? This can't be
          undone.
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

const Fuel = () => {
  const [logs, setLogs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [deletingLog, setDeletingLog] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const { data } = await fuelService.getAll();
      setLogs(data.data || []);
    } catch (err) {
      setLoadError(err?.response?.data?.message || "Could not load fuel logs.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVehicles = useCallback(async () => {
    try {
      const { data } = await vehicleService.getAll({ limit: 100 });
      setVehicles(data.data || []);
    } catch {
      // Vehicle lookup only needed for the create/edit form
    }
  }, []);

  useEffect(() => {
    fetchLogs();
    fetchVehicles();
  }, [fetchLogs, fetchVehicles]);

  const openCreate = () => {
    setEditingLog(null);
    setModalOpen(true);
  };

  const openEdit = (log) => {
    setEditingLog(log);
    setModalOpen(true);
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditingLog(null);
    fetchLogs();
  };

  const handleDeleted = () => {
    setDeletingLog(null);
    fetchLogs();
  };

  const totalCost = logs.reduce((sum, l) => sum + (l.cost || 0), 0);
  const totalLiters = logs.reduce((sum, l) => sum + (l.liters || 0), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Fuel Logs</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white"
        >
          + Add log
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total logs</div>
          <div className="text-2xl font-semibold text-white">{logs.length}</div>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total liters</div>
          <div className="text-2xl font-semibold text-white">{totalLiters.toLocaleString()}</div>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Total cost</div>
          <div className="text-2xl font-semibold text-white">&#8377;{totalCost.toLocaleString()}</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-slate-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Vehicle</th>
              <th className="text-left px-4 py-3">Liters</th>
              <th className="text-left px-4 py-3">Cost</th>
              <th className="text-left px-4 py-3">Odometer</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  Loading fuel logs...
                </td>
              </tr>
            )}

            {!loading && loadError && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-red-400">
                  {loadError}
                </td>
              </tr>
            )}

            {!loading && !loadError && logs.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  No fuel logs yet. Click "Add log" to record one.
                </td>
              </tr>
            )}

            {!loading &&
              !loadError &&
              logs.map((l) => (
                <tr key={l._id} className="text-slate-300 hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-white">
                    {l.vehicle?.registrationNo || "-"}
                  </td>
                  <td className="px-4 py-3">{l.liters} L</td>
                  <td className="px-4 py-3">&#8377;{l.cost?.toLocaleString()}</td>
                  <td className="px-4 py-3">{l.odometerReading?.toLocaleString() || "-"} km</td>
                  <td className="px-4 py-3">
                    {l.date ? new Date(l.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(l)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-sky-400 hover:bg-sky-500/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingLog(l)}
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
        <FuelFormModal
          initialData={editingLog}
          vehicles={vehicles}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {deletingLog && (
        <DeleteConfirmModal
          log={deletingLog}
          onClose={() => setDeletingLog(null)}
          onConfirmed={handleDeleted}
        />
      )}
    </div>
  );
};

export default Fuel;
