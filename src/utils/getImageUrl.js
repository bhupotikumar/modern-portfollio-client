const BASE_URL = import.meta.env.VITE_API_URL;

export const getImageUrl = (path) => {
    if (!path) return "/fallback.png";
    return `${BASE_URL}${path}`;
};