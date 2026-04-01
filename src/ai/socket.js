import { io } from "socket.io-client";

let socket = null;

export const initSocket = (userData = null, publicId = null) => {
  if (socket) return socket;

  const isAnonymous = !userData?.token;
  const authPayload = isAnonymous
    ? { publicId: publicId }
    : { token: userData.token };

  socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    auth: authPayload,
  });

  socket.on("connect", () => {
    socket.emit("addUser", {
      userId: userData?.userId || publicId || socket.id,
      name: userData?.name || "Anonymous",
      email: userData?.email || null,
      type: isAnonymous ? "public" : "user",
    });
  });

  socket.on("disconnect", (reason) => console.log("Socket disconnected:", reason));
  
  socket.on("connect_error", (err) => console.error("Socket connect error:", err.message));

  return socket;
};

export const getSocket = () => socket;
export const emitTyping = (receiverId) => socket?.emit("typing", { receiverId });
export const disconnectSocket = () => socket?.disconnect();
export const updateSocketToken = (token) => {
  if (!socket) return;
  socket.auth = { token };
  socket.disconnect().connect();
};