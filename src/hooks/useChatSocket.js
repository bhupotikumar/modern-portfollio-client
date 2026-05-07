import { useEffect, useState } from "react";

import {
    connectSocket,
    getSocket,
} from "../ai/socket.js";

const useChatSocket = ({
    authState,
    conversationId,
    setMessages,
}) => {
    const [aiTyping, setAiTyping] = useState(false);

    useEffect(() => {
        if (!conversationId) return;

        const socket = connectSocket({
            token: authState.token,
            publicId: authState.publicId,
            user: authState.user,
        });

        // NEW MESSAGE
        socket.on("message:new", (message) => {
            setMessages((prev) => {
                const exists = prev.some(
                    (m) => m._id === message._id
                );

                if (exists) return prev;

                return [...prev, message];
            });
        });

        // DELIVERED
        socket.on(
            "message:delivered",
            ({ tempId, messageId }) => {
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.tempId === tempId
                            ? {
                                ...msg,
                                _id: messageId,
                                status: "delivered",
                            }
                            : msg
                    )
                );
            }
        );

        // FAILED
        socket.on("message:failed", ({ tempId }) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.tempId === tempId
                        ? {
                            ...msg,
                            status: "failed",
                        }
                        : msg
                )
            );
        });

        // AI TYPING
        socket.on("ai:typing", () => {
            setAiTyping(true);
        });

        // AI STOP TYPING
        socket.on("ai:stopTyping", () => {
            setAiTyping(false);
        });

        return () => {
            socket.off("message:new");
            socket.off("message:delivered");
            socket.off("message:failed");
            socket.off("ai:typing");
            socket.off("ai:stopTyping");
        };
    }, [
        authState,
        conversationId,
        setMessages,
    ]);

    return {
        socket: getSocket(),
        aiTyping,
    };

};

export default useChatSocket;
