import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home.jsx";
import { FormBuilderContextProvider } from "./contexts/FormBuilderContext.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import CreateTypeBotPage from "./pages/CreateTypeBotPage/CreateTypeBotPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <Signup />,
    },
    {
        path: "dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
    },
    {
        path: "settings",
        element: (
            <PrivateRoute>
                <Settings />
            </PrivateRoute>
        ),
    },
    {
        path: "create-typebot",
        element: (
            <PrivateRoute>
                <CreateTypeBotPage />
            </PrivateRoute>
        ),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <FormBuilderContextProvider>
            <RouterProvider router={router} />
        </FormBuilderContextProvider>
    </React.StrictMode>
);
