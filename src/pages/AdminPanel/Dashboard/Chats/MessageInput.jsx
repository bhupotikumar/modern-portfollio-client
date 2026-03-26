import { useRef, useState, useLayoutEffect } from "react";

const MAX_HEIGHT = 160;

const MessageInput = ({ onSend, onResize }) => {
    const textareaRef = useRef(null);
    const [value, setValue] = useState("");

    // 🔥 Auto resize (runs after DOM update)
    useLayoutEffect(() => {
        const el = textareaRef.current;
        if (!el) return;

        el.style.height = "auto";
        const newHeight = Math.min(el.scrollHeight, MAX_HEIGHT);

        el.style.height = newHeight + "px";
        el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";

        onResize && onResize(); // notify parent (for chat scroll)
    }, [value, onResize]);

    // 🔥 Smart font scaling (smoother)
    const getFontSize = () => {
        const length = value.length;
        if (length < 80) return 16;
        if (length < 160) return 14;
        if (length < 300) return 13;
        return 12;
    };

    // 🔥 Handle typing
    const handleChange = (e) => {
        setValue(e.target.value);
    };

    // 🔥 Send message
    const handleSend = () => {
        if (!value.trim()) return;

        onSend && onSend(value);
        setValue("");

        // reset height
        const el = textareaRef.current;
        if (el) {
            el.style.height = "auto";
        }
    };

    // 🔥 Enter to send
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Type your message..."
            style={{ fontSize: `${getFontSize()}px` }}
            className="
                flex-1
                resize-none
                overflow-hidden
                p-2
                px-3
                border
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-primary/40
            "
        />
    );
};

export default MessageInput;