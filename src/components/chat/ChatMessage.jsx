const ChatMessage = ({ message, isMe }) => {
    const getStatus = () => {
        if (!isMe) return "";

        switch (message.status) {
            case "sent":
                return "✓ Sent";

            case "delivered":
                return "✓✓ Delivered";

            case "seen":
                return "Seen";

            case "failed":
                return "Failed";

            default:
                return "";
        }
    };

    const senderName = isMe
        ? "You"
        : "PBot";

    return (
        <div
            className={`flex ${isMe
                ? "justify-end"
                : "justify-start"
                }`}
        >
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-lg shadow-base-content/30
                ${isMe
                    ? "bg-primary text-white rounded-br-sm"
                    : "bg-base-200 text-base-content rounded-bl-sm"
                }
            `}>
                <div className="text-sm opacity-70 mb-1">
                    {senderName}
                </div>

                <p className="whitespace-pre-wrap wrap-break-word text-sm md:text-base leading-relaxed">
                    {message.text}
                </p>

                <div className={`mt-2 flex items-center justify-end gap-2 text-xs opacity-70`}>
                    <span>
                        {new Date(
                            message.createdAt
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>

                    {isMe && (
                        <span>{getStatus()}</span>
                    )}
                </div>
            </div>
        </div>
    );

};

export default ChatMessage;
