import dotenv from "dotenv";
import cors from "cors";
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

app.use(cors({ origin: process.env.CLIENT_URL ?? false, credentials: true }));

app.get("/", (req, res) => {
	res.send("Chat app server is running");
});

const appServer = app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});

export const io = new Server<ClientToServerEvents, ServerToClientEvents>(
	appServer,
	{ cors: { origin: [process.env.CLIENT_URL ?? false] } }
);

handleSocketConnection(io);
