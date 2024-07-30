import axios from "axios";
import conf from "../conf/conf";

const API_URL = `${conf.apiUrl}/api/v1/typebots`;

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const createTypeBot = (typeBotData) =>
    axiosInstance.post("/", typeBotData);
export const deleteTypeBot = (typeBotId) =>
    axiosInstance.delete(`/${typeBotId}`);
export const getUserTypeBots = () => axiosInstance.get("/user");
export const getTypeBotsByFolder = (folderId) =>
    axiosInstance.get(`/folder/${folderId}`);
export const getTypeBotById = (typeBotId) => axiosInstance.get(`/${typeBotId}`);
export const updateTypeBot = (typeBotId, typeBotData) =>
    axiosInstance.put(`/${typeBotId}`, typeBotData);
