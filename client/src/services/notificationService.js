import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getNotifications = () => axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS);

const markAsRead = (id) => axiosInstance.put(`${API_ENDPOINTS.NOTIFICATIONS}/${id}/read`);

const markAllAsRead = () => axiosInstance.put(`${API_ENDPOINTS.NOTIFICATIONS}/read-all`);

export default { getNotifications, markAsRead, markAllAsRead };
