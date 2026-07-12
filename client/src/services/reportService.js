import axiosInstance from "./axiosInstance";
import { API_ENDPOINTS } from "../constants/apiConstants";

const getSummary = () => axiosInstance.get(`${API_ENDPOINTS.REPORTS}/summary`);
const getExpenses = () => axiosInstance.get(`${API_ENDPOINTS.REPORTS}/expenses`);

export default { getSummary, getExpenses };
