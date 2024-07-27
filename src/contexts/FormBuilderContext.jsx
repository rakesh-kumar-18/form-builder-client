/* eslint-disable react/prop-types */
import { createContext, useEffect, useState, useCallback } from "react";
import {
    getCurrentUser,
    logoutUser,
    registerUser,
    loginUser,
    updateUserDetails,
} from "../api/userApi";
import { createFolder, deleteFolder, getUserFolders } from "../api/folderApi";
import {
    createTypeBot,
    deleteTypeBot,
    getUserTypeBots,
    getTypeBotsByFolder,
    getTypeBotById, // Import the new API call
} from "../api/typeBotApi";
import {
    addResponse,
    getResponses,
    incrementViewCount,
    incrementStartCount,
} from "../api/responseApi";

export const FormBuilderContext = createContext();

const FormBuilderContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    const [folders, setFolders] = useState([]);
    const [typeBots, setTypeBots] = useState([]);
    const [responses, setResponses] = useState([]);

    useEffect(() => {
        fetchUser();
    }, [username]);

    const fetchUserFolders = useCallback(async () => {
        try {
            const response = await getUserFolders();
            setFolders(response.data.data);
        } catch (error) {
            console.error("Error fetching folders:", error);
        }
    }, []);

    const fetchUserTypeBots = useCallback(async () => {
        try {
            const response = await getUserTypeBots();
            setTypeBots(response.data.data);
        } catch (error) {
            console.error("Error fetching typebots:", error);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setUsername(user.data.username);
            fetchUserFolders();
            fetchUserTypeBots();
        } else {
            setUsername("");
            setFolders([]);
            setTypeBots([]);
        }
    }, [user, fetchUserFolders, fetchUserTypeBots]);

    const fetchUser = async () => {
        try {
            const response = await getCurrentUser();
            if (response && response.data) {
                setUser(response.data);
            }
        } catch (error) {
            console.log("Error fetching user:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            setUsername("");
        } catch (error) {
            console.log("Failed to log out:", error);
        }
    };

    const register = async (userData) => {
        try {
            await registerUser(userData);
        } catch (error) {
            console.error("Failed to register:", error);
            throw error;
        }
    };

    const login = async (userData) => {
        setLoading(true);
        try {
            const response = await loginUser(userData);
            if (response && response.data) {
                setUser(response.data);
            }
            setLoading(false);
            return response;
        } catch (error) {
            console.error("Failed to login:", error);
            setLoading(false);
            throw error;
        }
    };

    const updateUser = async (userData) => {
        setLoading(true);
        try {
            const response = await updateUserDetails(userData);
            if (response && response.data) {
                setUser(response.data);
            }
            setLoading(false);
            return response;
        } catch (error) {
            console.error("Failed to update user:", error);
            setLoading(false);
            throw error;
        }
    };

    const handleCreateFolder = useCallback(
        async (folderData) => {
            try {
                await createFolder(folderData);
                fetchUserFolders();
            } catch (error) {
                console.error("Error creating folder:", error);
            }
        },
        [fetchUserFolders]
    );

    const handleDeleteFolder = useCallback(
        async (folderId) => {
            try {
                await deleteFolder(folderId);
                fetchUserFolders();
                fetchUserTypeBots();
            } catch (error) {
                console.error("Error deleting folder:", error);
            }
        },
        [fetchUserFolders, fetchUserTypeBots]
    );

    const handleCreateTypeBot = useCallback(
        async (typeBotData) => {
            try {
                const response = await createTypeBot(typeBotData);
                fetchUserTypeBots();
                return response; // Ensure to return the response
            } catch (error) {
                console.error("Error creating typebot:", error);
                throw error; // Ensure to throw the error so it can be caught in the component
            }
        },
        [fetchUserTypeBots]
    );

    const handleDeleteTypeBot = useCallback(
        async (typeBotId) => {
            try {
                await deleteTypeBot(typeBotId);
                fetchUserTypeBots();
            } catch (error) {
                console.error("Error deleting typebot:", error);
            }
        },
        [fetchUserTypeBots]
    );

    const handleGetTypeBotsByFolder = useCallback(async (folderId) => {
        try {
            const response = await getTypeBotsByFolder(folderId);
            setTypeBots(response.data.data);
        } catch (error) {
            console.error("Error fetching typebots by folder:", error);
        }
    }, []);

    const handleGetTypeBotById = useCallback(async (typeBotId) => {
        try {
            const response = await getTypeBotById(typeBotId);
            console.log(response);
            return response.data.data;
        } catch (error) {
            console.error("Error fetching typebot by ID:", error);
            throw error;
        }
    }, []);

    const handleAddResponse = async (responseData) => {
        try {
            await addResponse(responseData);
            fetchResponses(responseData.typeBotId);
        } catch (error) {
            console.error("Error adding response:", error);
        }
    };

    const handleIncrementViewCount = async (typeBotId) => {
        try {
            await incrementViewCount(typeBotId);
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }
    };

    const handleIncrementStartCount = async (typeBotId) => {
        try {
            await incrementStartCount(typeBotId);
        } catch (error) {
            console.error("Error incrementing start count:", error);
        }
    };

    const fetchResponses = async (typeBotId) => {
        try {
            const response = await getResponses(typeBotId);
            setResponses(response.data.responses);
        } catch (error) {
            console.error("Error fetching responses:", error);
        }
    };

    return (
        <FormBuilderContext.Provider
            value={{
                user,
                setUser,
                fetchUser,
                username,
                setUsername,
                logout,
                register,
                login,
                updateUser,
                loading,
                folders,
                handleCreateFolder,
                handleDeleteFolder,
                fetchUserFolders,
                typeBots,
                handleCreateTypeBot,
                handleDeleteTypeBot,
                fetchUserTypeBots,
                handleGetTypeBotsByFolder,
                handleGetTypeBotById,
                responses,
                handleAddResponse,
                handleIncrementViewCount,
                handleIncrementStartCount,
            }}
        >
            {children}
        </FormBuilderContext.Provider>
    );
};

export { FormBuilderContextProvider };
