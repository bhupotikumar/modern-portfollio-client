import { io } from "socket.io-client";

let socket = null;
let currentToken = null;
let isAnonymous = false;

// Initialize socket connection
export const initSocket = (userData = null) => {
  if (socket) return socket;

  currentToken = userData?.token || null;
  isAnonymous = !currentToken;

  socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    auth: isAnonymous ? {} : { token: currentToken },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  // On connect
  socket.on("connect", () => {
    const emitData = {
      userId: userData?.userId || socket.id,
      name: userData?.name || "Anonymous",
      email: userData?.email || null,
      type: isAnonymous ? "public" : "user",
    };
    socket.emit("addUser", emitData);
  });

  // On disconnect
  // socket.on("disconnect", (reason) => {
  //   console.log("Socket disconnected:", reason);
  // });

  // socket.on("connect_error", (err) => {
  //   console.error("Socket connect error:", err.message);
  // });

  // Typing event listener
  socket.on("typing", (typingUserId) => {
    console.log(`💬 ${typingUserId} is typing...`);
    // You can emit a custom event to update UI
    // e.g., setTyping(true) in ChatBox component
  });
  return socket;
};

// Get existing socket instance
export const getSocket = () => socket;

// Update socket token (after login)
export const updateSocketToken = (newToken) => {
  if (!socket || !newToken) return;

  currentToken = newToken;
  isAnonymous = false;

  socket.auth = { token: newToken };
  socket.disconnect().connect();
};

// Disconnect socket manually (logout or cleanup)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    currentToken = null;
    isAnonymous = false;
  }
};

// Emit typing event to server
export const emitTyping = (receiverId) => {
  if (socket && receiverId) {
    socket.emit("typing", { receiverId });
  }
};