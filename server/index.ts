import dotenv from "dotenv";
import express from "express";
import { Server } from "socket.io";
import {
	handleSocketConnection,
	ClientToServerEvents,
	ServerToClientEvents,
} from "./socket";

dotenv.config();

const PORT = process.env.PORT || 3500;
const app = express();

const appServer = app.listen(PORT, () => {
	console.log("Server listening on port 3500");
});

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(
	appServer,
	{ cors: { origin: process.env.CLIENT_URL ?? false } }
);

handleSocketConnection(io);
