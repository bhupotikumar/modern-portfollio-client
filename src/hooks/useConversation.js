import { useState } from "react";

const useConversation = () => {
    const [visitorId] = useState(() => {
        let id = localStorage.getItem("visitorId");

        if (!id) {
            id = crypto.randomUUID();
            localStorage.setItem("visitorId", id);
        }

        return id;
    });

    return {
        loading: false,
        visitorId,
        conversationId: visitorId,
    };
};

export default useConversation;