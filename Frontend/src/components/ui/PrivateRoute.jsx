import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) return null; // Wait for auth check

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
