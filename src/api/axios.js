import axios from "axios";
import auth from "../firebase/firebase.auth.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// REQUEST INTERCEPTOR (Attach Firebase Token)
api.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;

        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR (Global Error Handling)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Token expired / unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const user = auth.currentUser;
                if (user) {
                    const newToken = await user.getIdToken(true);
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return api(originalRequest);
                }
            } catch (err) {
                console.error("Token refresh failed", err);
                await auth.signOut();
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);
export default api;