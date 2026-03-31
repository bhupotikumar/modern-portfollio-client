import React from "react";

const ChatMessage = ({ message, isMe }) => {
    // Status text for "me"
    let statusText = "";
    if (isMe) {
        switch (message.status) {
            case "seen":
                statusText = "✅ Seen";
                break;
            case "delivered":
                statusText = "✔ Delivered";
                break;
            case "sending":
                statusText = "⏳ Sending...";
                break;
            case "failed":
                statusText = "❌ Failed";
                break;
            default:
                statusText = "";
        }
    }

    const senderName = isMe
        ? "You"
        : message.senderId === "AI_BOT"
            ? "AI"
            : message.senderName || message.senderId;

    return (
        <div className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
            <div className="chat-image avatar hidden">
                <div className="w-10 h-10 rounded-full bg-gray-300" />
            </div>

            <div className="chat-header flex items-center justify-between">
                <span className="font-semibold text-sm">{senderName}</span>
                <time className="text-xs opacity-50 ml-2">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </time>
            </div>

            <div
                className={`chat-bubble break-words max-w-[75%] ${isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                    }`}
            >
                {message.text}
            </div>

            {isMe && statusText && (
                <div className="chat-footer text-xs text-gray-500 mt-1 flex justify-end">
                    {statusText}
                </div>
            )}
        </div>
    );
};

export default ChatMessage;