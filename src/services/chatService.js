// import publicApi from "../api/publicApi";

import api from "../api/axios";

export const getMessages = async (conversationId) => {
    const res = await api.get(
        `/api/messages/${conversationId}`
    );

    return res.data;

};
