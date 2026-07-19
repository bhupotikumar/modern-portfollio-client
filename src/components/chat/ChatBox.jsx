import { useCallback, useEffect, useState } from "react";

import useConversation from "../../hooks/useConversation.js";
import useChatSocket from "../../hooks/useChatSocket.js";

import { getMessages } from "../../services/chatService.js";

import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);

    const {
        loading,
        conversationId,
    } = useConversation();

    const { socket, aiTyping } = useChatSocket({
        conversationId,
        setMessages,
    });

    // LOAD OLD MESSAGES
    useEffect(() => {
        if (!conversationId) return;

        const loadMessages = async () => {
            try {
                const data = await getMessages(
                    conversationId
                );

                setMessages(data || []);
            } catch (error) {
                console.error(error);
            }
        };

        loadMessages();
    }, [conversationId]);

    useEffect(() => {

        if (
            !socket ||
            !messages.length
        ) return;


        const lastMessage =
            messages[messages.length - 1];


        if (
            lastMessage.sender === "ai" &&
            !lastMessage.seen
        ) {

            socket.emit(
                "message:seen",
                {
                    conversationId,
                }
            );

        }


    }, [
        messages,
        socket,
        conversationId,
    ]);

    // SEND MESSAGE
    const handleSend = useCallback(
        (text) => {
            if (!socket || !conversationId) return;

            const tempId = crypto.randomUUID();

            const optimisticMessage = {
                _id: tempId,
                tempId,
                conversationId,
                sender: "visitor",
                text,
                status: "sending",
                seen: false,
                createdAt: new Date().toISOString(),
            };

            // Optimistic UI
            setMessages((prev) => [
                ...prev,
                optimisticMessage,
            ]);

            socket.emit("message:send", {
                tempId,
                conversationId,
                text,
            });
        },
        [socket, conversationId]
    );

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                Loading chat...
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col bg-transparent backdrop-blur-sm">
            {/* MESSAGES */}
            <ChatMessages
                messages={messages}
                aiTyping={aiTyping}
            />

            {/* INPUT */}
            <div className="border-t-2 border-base-content/50 p-3">
                <MessageInput
                    onSend={handleSend}
                />
            </div>
        </div>
    );
};

export default ChatBox;