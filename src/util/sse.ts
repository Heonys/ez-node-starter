import SSE from "sse";
import type http from "http";

export default function (server: http.Server) {
  const sse = new SSE(server);

  sse.on("connection", (client) => {
    setInterval(() => {
      client.send(Date.now().toString());
    }, 1000);
  });
}
