/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
    getCurrentUser,
    logoutUser,
    registerUser,
    loginUser,
} from "../api/userApi";

export const FormBuilderContext = createContext();

const FormBuilderContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");

    useEffect(() => {
        fetchUser();
    }, [username]);

    useEffect(() => {
        if (user) {
            setUsername(user.data.username);
        } else {
            setUsername("");
        }
    }, [user]);

    const fetchUser = async () => {
        try {
            const response = await getCurrentUser();
            setUser(response.data);
        } catch (error) {
            console.log(error);
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
        try {
            const response = await loginUser(userData);
            setUser(response.data);
        } catch (error) {
            console.error("Failed to login:", error);
            throw error;
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
            }}
        >
            {children}
        </FormBuilderContext.Provider>
    );
};

export { FormBuilderContextProvider };
