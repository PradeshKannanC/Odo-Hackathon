import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getStats = () => axiosInstance.get(`${API_ENDPOINTS.DASHBOARD}/stats`);

const getRecentTrips = (params) =>
  axiosInstance.get(`${API_ENDPOINTS.DASHBOARD}/recent-trips`, { params });

export default { getStats, getRecentTrips };
