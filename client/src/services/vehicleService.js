import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getAll = (params = {}) =>
  axiosInstance.get(API_ENDPOINTS.VEHICLES, { params });
const getById = (id) => axiosInstance.get(`${API_ENDPOINTS.VEHICLES}/${id}`);
const create = (payload) => axiosInstance.post(API_ENDPOINTS.VEHICLES, payload);
const update = (id, payload) =>
  axiosInstance.put(`${API_ENDPOINTS.VEHICLES}/${id}`, payload);
const remove = (id) => axiosInstance.delete(`${API_ENDPOINTS.VEHICLES}/${id}`);

export default { getAll, getById, create, update, remove };
