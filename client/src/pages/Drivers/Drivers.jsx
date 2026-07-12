import { useEffect, useState, useCallback } from "react";
import driverService from "../../services/driverService";

const STATUS_OPTIONS = ["AVAILABLE", "ON_TRIP", "OFF_DUTY", "SUSPENDED"];
const LICENSE_CATEGORIES = ["LMV", "HMV", "HGV", "MCWG", "PSV"];

const STATUS_STYLES = {
  AVAILABLE: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  ON_TRIP: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  OFF_DUTY: "bg-slate-500/15 text-slate-400 border-slate-500/30",
  SUSPENDED: "bg-red-500/15 text-red-400 border-red-500/30",
};

const EMPTY_FORM = {
  name: "",
  licenseNo: "",
  licenseCategory: "LMV",
  expiryDate: "",
  phone: "",
  experienceYears: "",
  safetyScore: "",
  status: "AVAILABLE",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${STATUS_STYLES[status] || STATUS_STYLES.OFF_DUTY}`}
    >
      {status?.replace("_", " ")}
    </span>
  );
}

function toFormValues(driver) {
  if (!driver) return EMPTY_FORM;
  return {
    name: driver.name || "",
    licenseNo: driver.licenseNo || "",
    licenseCategory: driver.licenseCategory || "LMV",
    expiryDate: driver.expiryDate ? driver.expiryDate.slice(0, 10) : "",
    phone: driver.phone || "",
    experienceYears: driver.experienceYears ?? "",
    safetyScore: driver.safetyScore ?? "",
    status: driver.status || "AVAILABLE",
  };
}

function DriverFormModal({ initialData, onClose, onSaved }) {
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
      name: form.name.trim(),
      licenseNo: form.licenseNo.trim(),
      licenseCategory: form.licenseCategory,
      expiryDate: form.expiryDate || undefined,
      phone: form.phone.trim(),
      experienceYears: Number(form.experienceYears) || 0,
      safetyScore: form.safetyScore === "" ? undefined : Number(form.safetyScore),
      status: form.status,
    };

    try {
      if (isEdit) {
        await driverService.update(initialData._id, payload);
      } else {
        await driverService.create(payload);
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
            {isEdit ? "Edit driver" : "Add driver"}
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
              <label className="block text-xs font-medium text-slate-400 mb-1">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ravi Kumar"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                License number
              </label>
              <input
                name="licenseNo"
                value={form.licenseNo}
                onChange={handleChange}
                placeholder="KA0420230012345"
                required
                disabled={isEdit}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                License category
              </label>
              <select
                name="licenseCategory"
                value={form.licenseCategory}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                {LICENSE_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                License expiry
              </label>
              <input
                name="expiryDate"
                type="date"
                value={form.expiryDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+919876543210"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Experience (years)
              </label>
              <input
                name="experienceYears"
                type="number"
                min="0"
                value={form.experienceYears}
                onChange={handleChange}
                placeholder="5"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Safety score (0-100)
              </label>
              <input
                name="safetyScore"
                type="number"
                min="0"
                max="100"
                value={form.safetyScore}
                onChange={handleChange}
                placeholder="90"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                    {s.replace("_", " ")}
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
              {saving ? "Saving..." : isEdit ? "Save changes" : "Add driver"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ driver, onClose, onConfirmed }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setDeleting(true);
    setError("");
    try {
      await driverService.remove(driver._id);
      onConfirmed();
    } catch (err) {
      setError(err?.response?.data?.message || "Could not delete this driver.");
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-2">Delete driver</h2>
        <p className="text-sm text-slate-400 mb-4">
          Remove <span className="text-white">{driver.name}</span> from the roster? This can't
          be undone.
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

const Drivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);
  const [deletingDriver, setDeletingDriver] = useState(null);

  const fetchDrivers = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const { data } = await driverService.getAll();
      setDrivers(data.data || []);
    } catch (err) {
      setLoadError(err?.response?.data?.message || "Could not load drivers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrivers();
  }, [fetchDrivers]);

  const openCreate = () => {
    setEditingDriver(null);
    setModalOpen(true);
  };

  const openEdit = (driver) => {
    setEditingDriver(driver);
    setModalOpen(true);
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditingDriver(null);
    fetchDrivers();
  };

  const handleDeleted = () => {
    setDeletingDriver(null);
    fetchDrivers();
  };

  const filteredDrivers = drivers.filter((d) => {
    const matchesSearch =
      !search.trim() ||
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.licenseNo?.toLowerCase().includes(search.toLowerCase()) ||
      d.phone?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Drivers</h1>
        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-sky-600 hover:bg-sky-500 text-white"
        >
          + Add driver
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, license, or phone..."
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
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60 text-slate-400 text-xs uppercase tracking-wide">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">License</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Experience</th>
              <th className="text-left px-4 py-3">Safety score</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-right px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {loading && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  Loading drivers...
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

            {!loading && !loadError && filteredDrivers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                  No drivers yet. Click "Add driver" to register one.
                </td>
              </tr>
            )}

            {!loading &&
              !loadError &&
              filteredDrivers.map((d) => (
                <tr key={d._id} className="text-slate-300 hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-white">{d.name}</td>
                  <td className="px-4 py-3">
                    {d.licenseNo}{" "}
                    <span className="text-slate-500">({d.licenseCategory})</span>
                  </td>
                  <td className="px-4 py-3">{d.phone}</td>
                  <td className="px-4 py-3">{d.experienceYears} yrs</td>
                  <td className="px-4 py-3">{d.safetyScore}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={d.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(d)}
                        className="px-3 py-1.5 rounded-md text-xs font-medium text-sky-400 hover:bg-sky-500/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingDriver(d)}
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
        <DriverFormModal
          initialData={editingDriver}
          onClose={() => setModalOpen(false)}
          onSaved={handleSaved}
        />
      )}

      {deletingDriver && (
        <DeleteConfirmModal
          driver={deletingDriver}
          onClose={() => setDeletingDriver(null)}
          onConfirmed={handleDeleted}
        />
      )}
    </div>
  );
};

export default Drivers;
