/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { FormBuilderContext } from "./contexts/FormBuilderContext";
import Loader from "./components/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(FormBuilderContext);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
