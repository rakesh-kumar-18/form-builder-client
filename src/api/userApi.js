import axios from "axios";
import conf from "../conf/conf";

const API_URL = `${conf.apiUrl}/api/v1/users`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const registerUser = (userData) =>
    axiosInstance.post(`${API_URL}/register`, userData);
export const loginUser = (userData) =>
    axiosInstance.post(`${API_URL}/login`, userData);
export const logoutUser = () => axiosInstance.post(`${API_URL}/logout`);
export const getCurrentUser = () =>
    axiosInstance.get(`${API_URL}/current-user`);
export const updateUserDetails = (userData) =>
    axiosInstance.put(`${API_URL}/update`, userData);
