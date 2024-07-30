import axios from "axios";
// import conf from "../conf/conf";

// const API_URL = `${conf.apiUrl}/api/v1/responses`;

const axiosInstance = axios.create({
    // baseURL: API_URL,
    withCredentials: true,
});

export const addResponse = (responseData) =>
    axiosInstance.post("/", responseData);
export const incrementViewCount = (typeBotId) =>
    axiosInstance.post(`/${typeBotId}/views`);
export const getResponses = (typeBotId) => axiosInstance.get(`/${typeBotId}`);
