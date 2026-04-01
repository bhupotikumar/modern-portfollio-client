import { useRef, useState, useLayoutEffect } from "react";
import { getSocket } from "../../ai/socket.js";

const MAX_HEIGHT = 160;

const MessageInput = ({ onSend, onResize }) => {
    const textareaRef = useRef(null);
    const [value, setValue] = useState("");

    // Auto resize
    useLayoutEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        el.style.height = Math.min(el.scrollHeight, MAX_HEIGHT) + "px";
        el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";

        onResize && onResize();
    }, [value, onResize]);

    // Emit typing event
    const emitTyping = () => {
        const socket = getSocket();
        if (!socket) return;
        socket.emit("typing", { receiverId: "AI_BOT" });
    };

    const handleSend = () => {
        if (!value.trim()) return;
        onSend(value);
        setValue("");

        const el = textareaRef.current;
        if (el) el.style.height = "auto";
    };

    const handleKeyDown = (e) => {
        emitTyping(); // trigger typing indicator

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="w-full flex-1 resize-none overflow-hidden p-2 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40"
            style={{ fontSize: value.length < 80 ? 16 : 14 }}
        />
    );
};

export default MessageInput;