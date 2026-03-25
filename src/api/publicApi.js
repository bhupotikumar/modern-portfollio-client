import axios from "axios";

const publicApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

publicApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.data);

            if (error.response.status === 500) {
                console.error("Server error");
            }
        } else if (error.request) {
            console.error("No response from server");
        } else {
            console.error("Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default publicApi;