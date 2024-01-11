import type http from "http";
import { Server, Socket } from "socket.io";

export default function (server: http.Server) {
  const io = new Server(server, { path: "/socket.io" });

  io.on("connection", (socket: Socket) => {
    console.log("새로운 클라이언트 접속 ip ::", socket.id);

    socket.on("disconnect", () => {
      console.log("클라이언트 접속 해제 ::", socket.id);
      clearInterval(socket.interval);
    });
    socket.on("error", console.error);

    socket.on("client-message", (data) => {
      console.log(data);
    });

    socket.interval = setInterval(() => {
      socket.emit("server-message", "서버 -> 클라이언트 메시지 보냄");
    }, 3000);
  });
}
