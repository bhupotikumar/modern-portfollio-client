import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

const ChatMessages = ({
    messages,
    aiTyping,
    myId,
}) => {
    const chatRef = useRef(null);

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, aiTyping]);

    return (
        <div ref={chatRef} className=" flex-1 overflow-y-auto px-3 py-4 space-y-4">
            {messages.map((message) => (
                <ChatMessage
                    key={message._id}
                    message={message}
                    isMe={
                        message.senderId === myId
                    }
                />
            ))}

            {aiTyping && <TypingIndicator />}
        </div>
    );

};

export default ChatMessages;
