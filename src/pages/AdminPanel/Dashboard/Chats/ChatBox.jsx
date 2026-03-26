import { useRef, useEffect } from 'react';
import Chats from './Chats';
import MessageInput from './MessageInput';

const ChatBox = () => {
    const chatRef = useRef(null);

    // 🔥 auto scroll function
    const scrollToBottom = () => {
        const el = chatRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    };

    // run on mount (initial)
    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <div className='w-full h-full p-2 border border-base-content/30 rounded-xl'>
            <div className="h-full flex flex-col gap-2">

                {/* Chat Area */}
                <div
                    ref={chatRef}
                    className="flex-1 min-h-0 overflow-y-auto no-scrollbar"
                >
                    <Chats />
                </div>

                {/* Input */}
                <form
                    className="flex items-end gap-2"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <MessageInput
                        onSend={(msg) => console.log("Send:", msg)}
                        onResize={scrollToBottom}
                    />

                    <button
                        type="button"
                        onClick={() => console.log("manual send")}
                        className="btn h-10 self-end"
                    >
                        Send
                    </button>
                </form>

            </div>
        </div>
    );
};

export default ChatBox;