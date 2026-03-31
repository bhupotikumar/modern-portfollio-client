import { Navigate } from "react-router";
import useAuth from "../context/useAuth.js";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!user || user.email !== adminEmail) {
        return <Navigate to="/login" replace />;
    }

    return children;
};


export default AdminRoute;