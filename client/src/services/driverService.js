import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getAll = () => axiosInstance.get(API_ENDPOINTS.DRIVERS);
const getById = (id) => axiosInstance.get(`${API_ENDPOINTS.DRIVERS}/${id}`);
const create = (payload) => axiosInstance.post(API_ENDPOINTS.DRIVERS, payload);
const update = (id, payload) => axiosInstance.put(`${API_ENDPOINTS.DRIVERS}/${id}`, payload);
const remove = (id) => axiosInstance.delete(`${API_ENDPOINTS.DRIVERS}/${id}`);

export default { getAll, getById, create, update, remove };
