import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.auth.js";
import { AuthContext } from "./AuthContext.js";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const token = await currentUser.getIdToken();
                currentUser.token = token;
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;