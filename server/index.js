import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;
const app = express();
const appServer = app.listen(PORT, () => {
	console.log("Server listening on port 3500");
});

app.use(express.static(path.join(__dirname, "public")));

const io = new Server(appServer, {
	cors: {
		origin:
			process.env.NODE_ENV === "production" ? false : ["http://127.0.0.1:5500"],
	},
});

io.on("connection", (socket) => {
	console.log(`User ${socket.id} connected.`);

	socket.on("message", (data) => {
		io.emit("message", `${socket.id.substring(0, 5)}: ${data}`);
	});
});
