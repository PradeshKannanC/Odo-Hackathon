import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/trips";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    tripId: "",
    vehicleId: "",
    driverId: "",
    source: "",
    destination: "",
    cargoWeight: "",
    plannedDistance: "",
    status: "DRAFT",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await axios.get(API);

      if (res.data.success) {
        setTrips(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, formData);
      } else {
        await axios.post(API, formData);
      }

      fetchTrips();

      setEditingId(null);

      setFormData({
        tripId: "",
        vehicleId: "",
        driverId: "",
        source: "",
        destination: "",
        cargoWeight: "",
        plannedDistance: "",
        status: "DRAFT",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (trip) => {
    setEditingId(trip._id);

    setFormData({
      tripId: trip.tripId,
      vehicleId: trip.vehicleId,
      driverId: trip.driverId,
      source: trip.source,
      destination: trip.destination,
      cargoWeight: trip.cargoWeight,
      plannedDistance: trip.plannedDistance,
      status: trip.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trip?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      fetchTrips();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTrips = trips.filter(
    (trip) =>
      trip.tripId.toLowerCase().includes(search.toLowerCase()) ||
      trip.source.toLowerCase().includes(search.toLowerCase()) ||
      trip.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white">

      <h1 className="text-3xl font-bold mb-6">
        Trip Management
      </h1>

      <div className="bg-gray-800 rounded-lg p-6 mb-8">

        <div className="grid grid-cols-2 gap-4">

          <input
            className="p-2 rounded bg-gray-700"
            name="tripId"
            placeholder="Trip ID"
            value={formData.tripId}
            onChange={handleChange}
          />

          <input
            className="p-2 rounded bg-gray-700"
            name="vehicleId"
            placeholder="Vehicle ID"
            value={formData.vehicleId}
            onChange={handleChange}
          />

          <input
            className="p-2 rounded bg-gray-700"
            name="driverId"
            placeholder="Driver ID"
            value={formData.driverId}
            onChange={handleChange}
          />

          <input
            className="p-2 rounded bg-gray-700"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
          />

          <input
            className="p-2 rounded bg-gray-700"
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
          />

          <input
            className="p-2 rounded bg-gray-700"
            name="cargoWeight"
            placeholder="Cargo Weight"
            value={formData.cargoWeight}
            onChange={handleChange}
          />

          <input
            className="p-2 rounded bg-gray-700"
            name="plannedDistance"
            placeholder="Distance"
            value={formData.plannedDistance}
            onChange={handleChange}
          />

          <select
            className="p-2 rounded bg-gray-700"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option>DRAFT</option>
            <option>DISPATCHED</option>
            <option>COMPLETED</option>
            <option>CANCELLED</option>
          </select>

        </div>

        <button
          onClick={handleSubmit}
          className="mt-5 bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
        >
          {editingId ? "Update Trip" : "Add Trip"}
        </button>

      </div>

      <input
        className="w-full p-3 rounded bg-gray-800 mb-6"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full bg-gray-900 rounded-lg">

        <thead className="bg-gray-700">

          <tr>

            <th className="p-3">Trip</th>

            <th>Source</th>

            <th>Destination</th>

            <th>Distance</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredTrips.map((trip) => (

            <tr
              key={trip._id}
              className="border-b border-gray-700"
            >

              <td className="p-3">{trip.tripId}</td>

              <td>{trip.source}</td>

              <td>{trip.destination}</td>

              <td>{trip.plannedDistance} km</td>

              <td>{trip.status}</td>

              <td>

                <button
                  className="bg-yellow-500 px-3 py-1 rounded mr-2"
                  onClick={() => handleEdit(trip)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 px-3 py-1 rounded"
                  onClick={() => handleDelete(trip._id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default Trips;