import {
    useLayoutEffect,
    useRef,
    useState,
} from "react";

const MAX_HEIGHT = 180;

const MessageInput = ({ onSend }) => {
    const textareaRef = useRef(null);

    const [value, setValue] = useState("");

    useLayoutEffect(() => {
        const el = textareaRef.current;

        if (!el) return;

        el.style.height = "auto";

        el.style.height =
            Math.min(el.scrollHeight, MAX_HEIGHT) +
            "px";

        el.style.overflowY =
            el.scrollHeight > MAX_HEIGHT
                ? "auto"
                : "hidden";
    }, [value]);

    const handleSend = () => {
        if (!value.trim()) return;

        onSend(value.trim());

        setValue("");
    };

    const handleKeyDown = (e) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {
            e.preventDefault();

            handleSend();
        }
    };

    return (
        <div className="flex items-end gap-2">

            <textarea
                ref={textareaRef}
                rows={1}
                value={value}
                onChange={(e) =>
                    setValue(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask me..."
                className="w-full resize-none rounded-2xl border bg-base-100 text-base-content px-4 py-3 outline-none focus:ring-2 focus:ring-primary/30"/>

            <button
                onClick={handleSend}
                className=" h-12 px-5 rounded-xl btn bg-base-200 font-medium hover:opacity-90 transition">
                Send
            </button>
        </div>
    );

};

export default MessageInput;
