import { useEffect, useState, useCallback } from "react";
import maintenanceService from "../../services/maintenanceService";
import vehicleService from "../../services/vehicleService";

const STATUS_OPTIONS = ["ACTIVE", "COMPLETED"];
const MAINTENANCE_TYPES = ["Oil Change", "Tire Replacement", "Brake Service", "General Service", "Engine Repair"];

const STATUS_STYLES = {
  ACTIVE: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  COMPLETED: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
};

const EMPTY_FORM = {
  vehicle: "",
  type: MAINTENANCE_TYPES[0],
  cost: "",
  date: "",
  notes: "",
  status: "ACTIVE",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${STATUS_STYLES[status] || STATUS_STYLES.ACTIVE}`}
    >
      {status}
    </span>
  );
}

function toFormValues(record) {
  if (!record) return EMPTY_FORM;
  return {
    vehicle: record.vehicle?._id || record.vehicle || "",
    type: record.type || MAINTENANCE_TYPES[0],
    cost: record.cost ?? "",
    date: record.date ? record.date.slice(0, 10) : "",
    notes: record.notes || "",
    status: record.status || "ACTIVE",
  };
}

function MaintenanceFormModal({ initialData, vehicles, onClose, onSaved }) {
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
      type: form.type,
      cost: Number(form.cost),
      date: form.date,
      notes: form.notes.trim(),
      status: form.status,
    };

    try {
      if (isEdit) {
        await maintenanceService.update(initialData._id, payload);
      } else {
        await maintenanceService.create(payload);
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
            {isEdit ? "Edit maintenance record" : "Add maintenance record"}
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
              <label className="block text-xs font-medium text-slate-400 mb-1">Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {MAINTENANCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Cost (₹)</label>
              <input
                name="cost"
                type="number"
                min="0"
                value={form.cost}
                onChange={handleChange}
                placeholder="5000"
                required
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

            <div className="col-span-2">
              <label className="block text-xs font-medium text-slate-400 mb-1">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                placeholder="Additional notes..."
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
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ record, onClose, onConfirmed }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await maintenanceService.remove(record._id);
      onConfirmed();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not delete this record.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-2">Delete maintenance record</h2>
        <p className="text-sm text-slate-400 mb-4">
          Remove this <span className="text-white">{record.type}</span> record? This can't be
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

const Maintenance = () => {
  const [records, setRecords] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deletingRecord, setDeletingRecord] = useState(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const params = {};
      if (statusFilter) params.status = statusFilter;
      const { data } = await maintenanceService.getAll(params);
      setRecords(data.data || []);
    } catch (err) {
      setLoadError(err?.response?.data?.message || "Could not load maintenance records.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  const fetchVehicles = useCallback(async () => {
    try {
      const { data } = await vehicleService.getAll({ limit: 100 });
      setVehicles(data.data || []);
    } catch {
      // Vehicle lookup only needed for the create/edit form
    }
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const openCreate = () => {
    setEditingRecord(null);
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditingRecord(record);
    setModalOpen(true);
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditingRecord(null);
    fetchRecords();
  };

  const handleDeleted = () => {
    setDeletingRecord(null);
    fetchRecords();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Maintenance</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white"
        >
          + Add record
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
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
              <th className="text-left px-4 py-3">Vehicle</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Cost</th>
              <th className="text-left px-4 py-3">Date</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  Loading maintenance records...
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

            {!loading && !loadError && records.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                  No maintenance records yet. Click "Add record" to log one.
                </td>
              </tr>
            )}

            {!loading &&
              !loadError &&
              records.map((r) => (
                <tr key={r._id} className="text-slate-300 hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-white">
                    {r.vehicle?.registrationNo || "-"}
                  </td>
                  <td className="px-4 py-3">{r.type}</td>
                  <td className="px-4 py-3">&#8377;{r.cost?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    {r.date ? new Date(r.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(r)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-sky-400 hover:bg-sky-500/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingRecord(r)}
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
        <MaintenanceFormModal
          initialData={editingRecord}
          vehicles={vehicles}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {deletingRecord && (
        <DeleteConfirmModal
          record={deletingRecord}
          onClose={() => setDeletingRecord(null)}
          onConfirmed={handleDeleted}
        />
      )}
    </div>
  );
};

export default Maintenance;
