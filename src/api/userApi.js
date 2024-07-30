import axios from "axios";
// import conf from "../conf/conf";

// const API_URL = `${conf.apiUrl}/api/v1/users`;

const axiosInstance = axios.create({
    // baseURL: API_URL,
    withCredentials: true,
});

export const registerUser = (userData) =>
    axiosInstance.post("/register", userData);
export const loginUser = (userData) => axiosInstance.post("/login", userData);
export const logoutUser = () => axiosInstance.post("/logout");
export const getCurrentUser = () => axiosInstance.get("/current-user");
export const updateUserDetails = (userData) =>
    axiosInstance.put("/update", userData);
