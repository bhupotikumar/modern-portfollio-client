import { useEffect, useState } from "react";

import {
    connectSocket,
    getSocket,
} from "../ai/socket.js";


const useChatSocket = ({
    conversationId,
    setMessages,
}) => {

    const [aiTyping, setAiTyping] =
        useState(false);


    useEffect(() => {

        if (!conversationId) return;


        const socket =
            connectSocket(conversationId);



        // NEW MESSAGE
        const handleNewMessage = (message) => {

            setMessages((prev) => {

                const exists =
                    prev.some(
                        (m) =>
                            m._id === message._id
                    );


                if (exists) return prev;


                return [
                    ...prev,
                    message
                ];

            });

        };



        // MESSAGE DELIVERED
        const handleDelivered = ({
            tempId,
            messageId,
        }) => {

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.tempId === tempId
                        ? {
                            ...msg,
                            _id: messageId,
                            status:
                                "delivered",
                        }
                        : msg
                )
            );

        };



        // MESSAGE SEEN
        const handleSeen = () => {

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.sender === "visitor"
                        ? {
                            ...msg,
                            seen: true,
                            status:
                                "seen",
                        }
                        : msg
                )
            );

        };



        // FAILED
        const handleFailed = ({
            tempId
        }) => {

            setMessages((prev) =>
                prev.map((msg) =>
                    msg.tempId === tempId
                        ? {
                            ...msg,
                            status:
                                "failed",
                        }
                        : msg
                )
            );

        };



        // AI TYPING
        const handleTyping = () => {
            setAiTyping(true);
        };


        const handleStopTyping = () => {
            setAiTyping(false);
        };




        socket.on(
            "message:new",
            handleNewMessage
        );

        socket.on(
            "message:delivered",
            handleDelivered
        );

        socket.on(
            "messages:seen",
            handleSeen
        );

        socket.on(
            "message:failed",
            handleFailed
        );

        socket.on(
            "ai:typing",
            handleTyping
        );

        socket.on(
            "ai:stopTyping",
            handleStopTyping
        );



        return () => {

            socket.off(
                "message:new",
                handleNewMessage
            );

            socket.off(
                "message:delivered",
                handleDelivered
            );

            socket.off(
                "messages:seen",
                handleSeen
            );

            socket.off(
                "message:failed",
                handleFailed
            );

            socket.off(
                "ai:typing",
                handleTyping
            );

            socket.off(
                "ai:stopTyping",
                handleStopTyping
            );

        };


    }, [
        conversationId,
        setMessages,
    ]);



    return {
        socket: getSocket(),
        aiTyping,
    };

};


export default useChatSocket;