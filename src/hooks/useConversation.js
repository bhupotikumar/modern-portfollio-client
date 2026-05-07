import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import auth from "../firebase/firebase.auth.js";

const useConversation = () => {
    const [loading, setLoading] = useState(true);

    const [authState, setAuthState] = useState({
        token: null,
        user: null,
        publicId: null,
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(
            async (user) => {
                if (user) {
                    const token =
                        await user.getIdToken();

                    setAuthState({
                        token,
                        user,
                        publicId: null,
                    });

                    setLoading(false);
                } else {
                    let publicId =
                        localStorage.getItem("publicId");

                    if (!publicId) {
                        publicId = `public - ${uuidv4()} `;

                        localStorage.setItem(
                            "publicId",
                            publicId
                        );
                    }

                    setAuthState({
                        token: null,
                        user: null,
                        publicId,
                    });

                    setLoading(false);
                }
            }
        );

        return () => unsubscribe();
    }, []);

    const conversationId =
        authState.user?.uid ||
        authState.publicId;

    const myId =
        authState.user?.uid ||
        authState.publicId;

    return {
        loading,
        authState,
        conversationId,
        myId,
    };

};

export default useConversation;
