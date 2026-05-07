const TypingIndicator = () => {
    return (<div className="flex items-center gap-1 px-3 py-2">

        <div className="flex gap-1">

            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>

            <span
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
            ></span>

            <span
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0.4s" }}
            ></span>

        </div>

        <span className="text-xs text-gray-400">
            PBot typing...
        </span>
    </div>
    );

};

export default TypingIndicator;
