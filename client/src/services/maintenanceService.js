import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getAll = () => axiosInstance.get(API_ENDPOINTS.MAINTENANCE);
const getById = (id) => axiosInstance.get(`${API_ENDPOINTS.MAINTENANCE}/${id}`);
const create = (payload) => axiosInstance.post(API_ENDPOINTS.MAINTENANCE, payload);
const update = (id, payload) => axiosInstance.put(`${API_ENDPOINTS.MAINTENANCE}/${id}`, payload);
const remove = (id) => axiosInstance.delete(`${API_ENDPOINTS.MAINTENANCE}/${id}`);

export default { getAll, getById, create, update, remove };
