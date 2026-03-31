import { useState } from 'react';
import ChatBox from '../../pages/Chats/ChatBox';
import { ImCross } from 'react-icons/im';
import { BsChatRightText } from "react-icons/bs";


const Collapse = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col items-end">

            {/* Chat Window */}
            <div
                className={`pointer-events-auto w-1/3 h-[60vh] bg-base-100 border border-base-content/20 rounded-xl shadow-2xl shadow-base-content/30 overflow-hidden flex flex-col
                transition-all duration-300 origin-bottom-right
                ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"}`}
            >
                {/* Header */}
                <div className="bg-primary text-primary-content px-4 py-3 flex justify-between items-center">
                    <span className="font-semibold">Ask Me</span>

                    <button
                        onClick={() => setOpen(false)}
                        className="text-lg hover:scale-110 transition"
                    >
                        <ImCross />
                    </button>
                </div>

                {/* Chat */}
                <div className="flex-1 min-h-0">
                    <ChatBox conversationId="public-chat-1" />
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="pointer-events-auto w-14 h-14 rounded-full bg-primary text-primary-content shadow-xl flex items-center justify-center text-xl hover:scale-110 active:scale-95 transition-all duration-200"
            >
                {open ? <ImCross /> : <BsChatRightText />}
            </button>

        </div>
    );
};

export default Collapse;