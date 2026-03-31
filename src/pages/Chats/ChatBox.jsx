import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import { initSocket, getSocket, emitTyping } from "../../ai/socket.js";
import auth from "../../firebase/firebase.auth.js";
import api from "../../api/axios.js";

const ChatBox = ({ conversationId }) => {
    const chatRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userType, setUserType] = useState("loading");
    const myId = userData?.userId || "Anonymous";

    // Auto-scroll to bottom
    const scrollToBottom = () => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth",
        });
    };

    // ✅ Auth listener
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setUserData({
                    token,
                    userId: user.uid,
                    name: user.displayName || "Anonymous",
                });
                setUserType("user");
            } else {
                setUserData(null);
                setUserType("public");
            }
        });
        return () => unsubscribe();
    }, []);

    // ✅ Setup socket and fetch messages
    useEffect(() => {
        if (userType === "loading") return;
        if (userType === "user" && !userData?.token) return;

        const socket = initSocket(userData);
        let typingTimeout;

        const fetchMessages = async () => {
            try {
                const url =
                    userType === "public"
                        ? `/api/messages/public/${conversationId}`
                        : `/api/messages/${conversationId}`;
                const headers = userType === "user" ? { Authorization: `Bearer ${userData.token}` } : {};
                const res = await api.get(url, { headers });

                const updatedMessages = res.data.map((msg) => ({
                    ...msg,
                    status: msg.seen ? "seen" : "delivered",
                }));

                setMessages(updatedMessages);
            } catch (err) {
                console.error("Failed to fetch messages:", err.response?.data?.message || err.message);
            }
        };

        fetchMessages();

        // ✅ Incoming messages
        const handleIncoming = async (msg) => {
            let status = msg.status || "sending";

            if (msg.senderId === "AI_BOT") {
                status = msg.seen ? "seen" : "delivered";

                if (userType === "user" && !msg.seen) {
                    try {
                        const headers = { Authorization: `Bearer ${userData.token}` };
                        const res = await api.patch(`/api/messages/${msg._id}/seen`, {}, { headers });
                        msg.seen = res.data.seen;
                        status = msg.seen ? "seen" : "delivered";
                    } catch (err) {
                        console.error("Failed to mark AI message as seen:", err);
                    }
                }
            }

            setMessages((prev) => {
                const exists = prev.find((m) => m._id === msg._id);
                if (exists) return prev.map((m) => (m._id === msg._id ? { ...m, ...msg, status } : m));
                return [...prev, { ...msg, status }];
            });
        };

        socket.on("getMessage", handleIncoming);

        // ✅ Typing
        socket.on("typing", () => {
            setTyping(true);
            if (typingTimeout) clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => setTyping(false), 1200);
        });

        return () => {
            socket?.off("getMessage", handleIncoming);
            socket?.off("typing");
        };
    }, [conversationId, userType, userData]);

    useEffect(scrollToBottom, [messages, typing]);

    // ✅ Send message
    const handleSend = (text) => {
        if (!text.trim()) return;

        const socket = getSocket();
        const receiverId = "AI_BOT";

        const tempMsg = {
            _id: Date.now(),
            senderId: myId,
            receiverId,
            conversationId,
            text,
            createdAt: new Date().toISOString(),
            status: "sending",
            seen: false,
        };

        setMessages((prev) => [...prev, tempMsg]);

        // Emit message
        socket?.emit("sendMessage", { senderId: myId, receiverId, conversationId, text });

        // Send typing when user starts typing
        emitTyping(receiverId);

        if (userType === "user") {
            const headers = { Authorization: `Bearer ${userData.token}` };
            api
                .post("/api/messages", { conversationId, senderId: myId, receiverId, text }, { headers })
                .then((res) => {
                    const savedMsg = res.data.message;
                    setMessages((prev) =>
                        prev.map((m) =>
                            m._id === tempMsg._id
                                ? { ...m, _id: savedMsg._id, status: "delivered", seen: savedMsg.seen || false }
                                : m
                        )
                    );
                })
                .catch(() =>
                    setMessages((prev) =>
                        prev.map((m) => (m._id === tempMsg._id ? { ...m, status: "failed" } : m))
                    )
                );
        }
    };

    if (userType === "loading") return <div className="p-4 text-center">Loading chat...</div>;

    return (
        <div className="w-full h-full p-2 flex flex-col gap-2">
            <div ref={chatRef} className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col gap-2">
                {messages.map((msg) => (
                    <ChatMessage key={msg._id} message={msg} isMe={msg.senderId === myId} />
                ))}
                {typing && <div className="text-gray-400 italic ml-2">AI is typing...</div>}
            </div>

            <form
                className="flex items-end gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    const text = e.target[0].value;
                    handleSend(text);
                    e.target[0].value = "";
                }}
            >
                <MessageInput onSend={handleSend} onResize={scrollToBottom} />
                <button type="submit" className="btn h-10 self-end">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatBox;