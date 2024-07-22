/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FormBuilderContext } from "./contexts/FormBuilderContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(FormBuilderContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
