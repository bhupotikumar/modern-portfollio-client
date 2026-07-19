import { io } from "socket.io-client";

let socket = null;

// Get or create a persistent visitor ID
const getVisitorId = () => {
  let visitorId = localStorage.getItem("visitorId");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }

  return visitorId;
};

export const connectSocket = (conversationId) => {
  if (socket?.connected) return socket;

  const visitorId = getVisitorId();

  socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    auth: {
      visitorId,
    },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    // console.log("Socket Connected");

    socket.emit("conversation:join", {
      conversationId,
    });
  });

  socket.on("disconnect", (reason) => {
    // console.log("Socket Disconnected:", reason);
  });

  socket.on("connect_error", (error) => {
    console.error(
      "Socket Connection Error:",
      error.message
    );
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (!socket) return;

  socket.disconnect();
  socket = null;
};