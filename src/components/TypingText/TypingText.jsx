import { useState, useEffect } from "react";

const TypingText = ({ text = "", speed = 120, pause = 1000 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!text) return;

        const typingSpeed = isDeleting ? speed / 2 : speed;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // 👉 Typing forward
                setDisplayedText(text.slice(0, index + 1));
                setIndex((prev) => prev + 1);

                // Done typing → pause → start deleting
                if (index + 1 === text.length) {
                    setTimeout(() => setIsDeleting(true), pause);
                }
            } else {
                // 👉 Deleting backward
                setDisplayedText(text.slice(0, index - 1));
                setIndex((prev) => prev - 1);

                // Done deleting → start typing again
                if (index - 1 === 0) {
                    setIsDeleting(false);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [index, isDeleting, text, speed, pause]);

    return (
        <span className="border-r-2 border-indigo-500">
            {displayedText}
        </span>
    );
};

export default TypingText;
