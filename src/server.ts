import app from "./app";
import { connectDB } from "./db";
import websocket from "./util/socket";
import serverSiteEvent from "./util/sse";

connectDB()
  .then(() => {
    const server = app.listen(app.get("port"));
    websocket(server);
    serverSiteEvent(server);
  })
  .catch(console.error);
