import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/folders";

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const createFolder = (folderData) => axiosInstance.post("/", folderData);
export const deleteFolder = (folderId) => axiosInstance.delete(`/${folderId}`);
export const getUserFolders = () => axiosInstance.get("/user");
