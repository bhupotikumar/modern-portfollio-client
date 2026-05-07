import { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { BsChatRightText } from "react-icons/bs";
import ChatBox from '../chat/Chatbox';


const Collapse = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-1/4 h-[60vh] fixed bottom-4 right-4 z-50 pointer-events-none flex flex-col items-end">

            {/* Chat Window */}
            <div
                className={`pointer-events-auto w-full h-full bg-base-100 border border-base-content/20 rounded-xl shadow-2xl shadow-base-content/30 overflow-hidden flex flex-col
                transition-all duration-300 origin-bottom-right
                ${open ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"}`}
            >
                {/* Header */}
                <div className="bg-primary text-primary-content px-4 py-3 flex justify-between items-center">
                    <span className="font-semibold flex items-center gap-2">
                        <h2>PBot | Ask Me</h2>
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </span>
                    <button
                        onClick={() => setOpen(false)}
                        className="text-lg hover:scale-110 transition"
                    >
                        <ImCross />
                    </button>
                </div>

                {/* Chat */}
                <div className="flex-1 min-h-0">
                    <ChatBox />
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