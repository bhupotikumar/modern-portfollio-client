const ChatMessage = ({ message, isMe }) => {
    const getStatus = () => {
        if (!isMe) return "";

        switch (message.status) {
            case "sending":
                return "Sending...";

            case "delivered":
                return "✓ Delivered";

            case "seen":
                return "Seen";

            case "failed":
                return "Failed";

            default:
                return "";
        }
    };

    const senderName = isMe ? "You" : "PBot";

    return (
        <div
            className={`flex ${isMe ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-[80%] rounded-xl px-3 py-2 shadow-lg shadow-base-content/40
                    ${isMe
                        ? "bg-base-200 text-base-content rounded-br-sm"
                        : "bg-primary text-primary-content rounded-bl-sm"
                    }`}
            >
                <div className="text-sm opacity-70">
                    {senderName}
                </div>

                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                    {message.text}
                </p>

                <div className="mt-2 flex items-center justify-end gap-2 text-xs opacity-70">
                    <span>
                        {message.createdAt
                            ? new Date(
                                message.createdAt
                            ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })
                            : ""}
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