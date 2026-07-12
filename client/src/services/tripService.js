import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getAll = () => axiosInstance.get(API_ENDPOINTS.TRIPS);
const getById = (id) => axiosInstance.get(`${API_ENDPOINTS.TRIPS}/${id}`);
const create = (payload) => axiosInstance.post(API_ENDPOINTS.TRIPS, payload);
const update = (id, payload) => axiosInstance.put(`${API_ENDPOINTS.TRIPS}/${id}`, payload);
const remove = (id) => axiosInstance.delete(`${API_ENDPOINTS.TRIPS}/${id}`);

export default { getAll, getById, create, update, remove };
