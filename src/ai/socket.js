import { io } from "socket.io-client";

let socket = null;

export const connectSocket = ({
  token = null,
  publicId = null,
  user = null,
}) => {
  if (socket?.connected) return socket;


  socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    auth: {
      token,
      publicId,
    },
  });

  socket.on("connect", () => {
    console.log("✅ Socket Connected");

    socket.emit("user:join", {
      userId: user?.uid || publicId,

      conversationId:
        user?.uid || publicId,

      name:
        user?.displayName ||
        "Anonymous",

      type: token
        ? "user"
        : "public",
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket Disconnected");
  });

  socket.on("connect_error", (err) => {
    console.error("Socket Error:", err.message);
  });

  return socket;

};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
