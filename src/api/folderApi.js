import axios from "axios";
// import conf from "../conf/conf";

// const API_URL = `${conf.apiUrl}/api/v1/folders`;

const axiosInstance = axios.create({
    // baseURL: API_URL,
    withCredentials: true,
});

export const createFolder = (folderData) => axiosInstance.post("/", folderData);
export const deleteFolder = (folderId) => axiosInstance.delete(`/${folderId}`);
export const getUserFolders = () => axiosInstance.get("/user");
