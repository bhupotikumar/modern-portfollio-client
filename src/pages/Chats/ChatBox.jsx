import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MessageInput from "./MessageInput";
import ChatMessage from "./ChatMessage";
import { initSocket, getSocket, emitTyping } from "../../ai/socket.js";
import auth from "../../firebase/firebase.auth.js";
import api from "../../api/axios.js";

const ChatBox = () => {
    const chatRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userType, setUserType] = useState("loading");
    const [publicId, setPublicId] = useState(null);
    const [conversationId, setConversationId] = useState(null);

    const myId = userData?.userId || publicId;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const token = await user.getIdToken();
                setUserData({ token, userId: user.uid, name: user.displayName || "Anonymous" });
                setUserType("user");
                setConversationId(user.uid);
            } else {
                setUserData(null);
                setUserType("public");

                // Try to get publicId from localStorage
                let storedPublicId = localStorage.getItem("publicId");
                if (!storedPublicId) {
                    storedPublicId = `public-${uuidv4()}`;
                    localStorage.setItem("publicId", storedPublicId);
                }

                setPublicId(storedPublicId);
                setConversationId(storedPublicId);
            }
        });
        return () => unsubscribe();
    }, []);

    const scrollToBottom = () => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        if (userType === "loading" || !conversationId) return;
        const publicId = userType === "public" ? conversationId : null;
        const socket = initSocket(userData, publicId);

        // fetch previous messages
        const fetchMessages = async () => {
            try {
                const url = userType === "public"
                    ? `/api/messages/public/${conversationId}`
                    : `/api/messages/${conversationId}`;
                const headers = userType === "user" ? { Authorization: `Bearer ${userData.token}` } : {};
                const res = await api.get(url, { headers });
                setMessages(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();

        // remove old listeners
        socket.off("getMessage");
        socket.off("typing");

        socket.on("getMessage", (msg) => {
            setMessages((prev) => {
                if (prev.find((m) => m._id === msg._id)) return prev;
                return [...prev, msg];
            });
        });

        socket.on("typing", () => {
            setTyping(true);
            setTimeout(() => setTyping(false), 1200);
        });
    }, [conversationId, userType, userData]);

    useEffect(() => {
        chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, typing]);

    const handleSend = (text) => {
        if (!text.trim() || !conversationId) return;
        const socket = getSocket();

        const tempMsg = {
            _id: Date.now(),
            senderId: myId,
            receiverId: "AI_BOT",
            conversationId,
            text,
            status: "sending",
            createdAt: new Date(),
            seen: false,
        };
        setMessages((prev) => [...prev, tempMsg]);

        socket.emit("sendMessage", { senderId: myId, receiverId: "AI_BOT", conversationId, text });
        emitTyping("AI_BOT");
    };

    if (userType === "loading" || !conversationId) return <div>Loading chat...</div>;

    return (
        <div className="w-full hu full flex flex-col h-full gap-2">
            <div ref={chatRef} className="flex-1 overflow-y-auto flex flex-col gap-2">
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
                <MessageInput onSend={handleSend} onResize={() => scrollToBottom()} />
                <button type="submit" className="btn h-10 self-end">Send</button>
            </form>
        </div>
    );
};

export default ChatBox;