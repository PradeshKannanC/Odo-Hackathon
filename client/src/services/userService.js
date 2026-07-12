import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getUserById = (id) => axiosInstance.get(`${API_ENDPOINTS.USERS}/${id}`);

const updateUser = (id, payload) => axiosInstance.put(`${API_ENDPOINTS.USERS}/${id}`, payload);

export default { getUserById, updateUser };
