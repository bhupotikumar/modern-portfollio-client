import { useCallback, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import useConversation from "../../hooks/useConversation.js";
import useChatSocket from "../../hooks/useChatSocket.js";

import { getMessages } from "../../services/chatService.js";

import ChatMessages from "./ChatMessages";
import MessageInput from "./MessageInput";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);

    const {
        loading,
        authState,
        conversationId,
        myId,
    } = useConversation();

    const { socket, aiTyping } =
        useChatSocket({
            authState,
            conversationId,
            setMessages,
        });

    // LOAD OLD MESSAGES
    useEffect(() => {
        if (!conversationId) return;

        const loadMessages = async () => {
            try {
                const data =
                    await getMessages(
                        conversationId
                    );

                setMessages(data || []);
            } catch (err) {
                console.error(err);
            }
        };

        loadMessages();
    }, [conversationId]);

    // SEND MESSAGE
    const handleSend = useCallback(
        (text) => {
            if (!socket) return;

            const tempId = uuidv4();

            const optimisticMessage = {
                _id: tempId,
                tempId,
                conversationId,
                senderId: myId,
                senderType:
                    authState.user
                        ? "user"
                        : "public",
                text,
                status: "sent",
                createdAt:
                    new Date().toISOString(),
            };

            // Optimistic UI
            setMessages((prev) => [
                ...prev,
                optimisticMessage,
            ]);

            socket.emit("message:send", {
                tempId,
                conversationId,
                senderId: myId,
                text,
            });
        },
        [
            socket,
            conversationId,
            myId,
            authState.user,
        ]
    );

    if (loading) {
        return (
            <div className=" h-full flex items-center justify-center">
                Loading chat...
            </div>
        );
    }

    return (
        <div
            className="
            w-full
            h-full
            flex
            flex-col
            bg-base-100
        "
        >
            {/* MESSAGES */}
            <ChatMessages
                messages={messages}
                aiTyping={aiTyping}
                myId={myId}
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
