import dotenv from "dotenv";
import express from "express";
import path from "path";
import { Server } from "socket.io";
import {
	handleSocketConnection,
	ClientToServerEvents,
	ServerToClientEvents,
} from "./socket";

dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const appServer = app.listen(PORT, () => {
	console.log("Server listening on port 3500");
});

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(
	appServer,
	{ cors: { origin: process.env.CLIENT_URL ?? false } }
);

handleSocketConnection(io);
