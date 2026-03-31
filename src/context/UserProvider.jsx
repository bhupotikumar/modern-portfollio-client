import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import publicApi from "../api/publicApi";

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await publicApi.get("/api/user");
            setUser(res.data);
        } catch (err) {
            console.error("Failed to fetch user:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        user,
        loading,
        refetchUser: fetchUser,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;