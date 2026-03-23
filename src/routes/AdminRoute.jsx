import { Navigate } from "react-router";
import useAuth from "../context/useAuth.js";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

    // 1️⃣ Wait until Firebase finishes loading
    if (loading) {
        return <p>Loading...</p>; // or spinner
    }

    // 2️⃣ Redirect if not logged in or not admin
    if (!user || user.email !== adminEmail) {
        return <Navigate to="/login" replace />;
    }

    // 3️⃣ Access granted
    return children;
};


export default AdminRoute;