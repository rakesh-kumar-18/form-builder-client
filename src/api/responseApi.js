import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/responses";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const addResponse = (responseData) =>
    axiosInstance.post("/", responseData);
export const incrementViewCount = (typeBotId) =>
    axiosInstance.post(`/${typeBotId}/views`);
export const getResponses = (typeBotId) => axiosInstance.get(`/${typeBotId}`);
