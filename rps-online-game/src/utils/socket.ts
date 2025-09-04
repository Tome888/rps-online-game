// import { io } from "socket.io-client";

// const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`); // Change to your backend URL/port

// export default socket;
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
