import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useUser();
    const location = useLocation();

    if (loading) return <LoadingSpinner />;

    return user ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
