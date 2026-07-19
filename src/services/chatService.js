import api from "../api/axios";

export const getMessages = async (conversationId) => {
    if (!conversationId) return [];

    const { data } = await api.get(
        `/api/messages/${conversationId}`
    );

    return data;
};