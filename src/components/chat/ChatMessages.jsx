import { useEffect, useRef } from "react";

import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";


const ChatMessages = ({
    messages,
    aiTyping,
}) => {

    const chatRef = useRef(null);

    const previousLength = useRef(0);


    useEffect(() => {

        const container = chatRef.current;

        if (!container) return;


        const isNewMessage =
            messages.length >
            previousLength.current;


        if (isNewMessage || aiTyping) {

            container.scrollTo({
                top: container.scrollHeight,
                behavior: "smooth",
            });

        }


        previousLength.current =
            messages.length;


    }, [
        messages.length,
        aiTyping,
    ]);



    return (
        <div
            ref={chatRef}
            className="
                flex-1
                overflow-y-auto
                px-3
                py-4
                space-y-4
            "
        >

            {messages.map((message) => (

                <ChatMessage
                    key={
                        message._id ||
                        message.tempId
                    }
                    message={message}
                    isMe={
                        message.sender === "visitor"
                    }
                />

            ))}


            {aiTyping && (
                <TypingIndicator />
            )}

        </div>
    );
};


export default ChatMessages;