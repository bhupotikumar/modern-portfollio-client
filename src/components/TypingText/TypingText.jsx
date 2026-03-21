import { useState, useEffect } from "react";

const TypingText = ({ text, speed = 150 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            setIndex((prev) => prev + 1);
        }, speed);

        if (index >= text.length) {
            clearInterval(interval);
            // Restart after 1s pause
            setTimeout(() => {
                setDisplayedText("");
                setIndex(0);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [index, text, speed]);

    return (
        <span className="border-r-2 border-indigo-500 pr-1">{displayedText}</span>
    );
};

export default TypingText;