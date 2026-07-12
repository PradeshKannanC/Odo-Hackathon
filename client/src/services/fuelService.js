import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getAll = () => axiosInstance.get(API_ENDPOINTS.FUEL);
const getById = (id) => axiosInstance.get(`${API_ENDPOINTS.FUEL}/${id}`);
const create = (payload) => axiosInstance.post(API_ENDPOINTS.FUEL, payload);
const update = (id, payload) => axiosInstance.put(`${API_ENDPOINTS.FUEL}/${id}`, payload);
const remove = (id) => axiosInstance.delete(`${API_ENDPOINTS.FUEL}/${id}`);

export default { getAll, getById, create, update, remove };
