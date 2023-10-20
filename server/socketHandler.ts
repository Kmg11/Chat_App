import { Server } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents } from "./types";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {
	activatedUser,
	getAllActiveRooms,
	getUser,
	getUsersInRoom,
	userLeave,
} from "./userState";

const ADMIN = "Admin";

export function handleSocketConnection(
	io: Server<ClientToServerEvents, ServerToClientEvents, DefaultEventsMap, any>
) {
	io.on("connection", (socket) => {
		// * Send rooms list to the user connected
		io.emit("roomList", { rooms: getAllActiveRooms() });

		// * Listen for enterRoom event
		socket.on("enterRoom", ({ name, room }) => {
			const user = activatedUser({ id: socket.id, name, room });

			// * Join room
			socket.join(user.room);

			// * Send a message to the user connected
			socket.emit("message", buildMsg(ADMIN, `Welcome to room ${user.room}`));

			// * Broadcast to all users in the room that a user has joined
			socket.broadcast
				.to(room)
				.emit("message", buildMsg(ADMIN, `${user.name} has joined the chat`));

			// * Send users and room info
			io.to(user.room).emit("userList", { users: getUsersInRoom(user.room) });

			// * Update rooms list for all users
			io.emit("roomList", { rooms: getAllActiveRooms() });
		});

		// * Listen for leaveRoom event
		socket.on("leaveRoom", () => {
			const user = getUser(socket.id);

			if (user) {
				userLeave(socket.id);

				socket.leave(user.room);

				io.to(user.room).emit(
					"message",
					buildMsg(ADMIN, `${user.name} has left the chat`)
				);

				io.to(user.room).emit("userList", { users: getUsersInRoom(user.room) });

				io.emit("roomList", { rooms: getAllActiveRooms() });
			}
		});

		// * When a user disconnects, send a message to all users except the user disconnected
		socket.on("disconnect", () => {
			const user = getUser(socket.id);
			userLeave(socket.id);

			if (user) {
				io.to(user.room).emit(
					"message",
					buildMsg(ADMIN, `${user.name} has left the chat`)
				);

				io.to(user.room).emit("userList", { users: getUsersInRoom(user.room) });

				io.emit("roomList", { rooms: getAllActiveRooms() });
			}
		});

		// * Listen for activity event
		socket.on("activity", (name) => {
			const room = getUser(socket.id)?.room;

			if (room) {
				socket.broadcast.to(room).emit("activity", name);
			}
		});

		// * Listen for a message event
		socket.on("message", ({ name, text }) => {
			const room = getUser(socket.id)?.room;
			if (room) io.to(room).emit("message", buildMsg(name, text));
		});
	});

	function buildMsg(name: string, text: string) {
		return {
			name,
			text,
			time: new Intl.DateTimeFormat("default", {
				hour: "numeric",
				minute: "numeric",
				second: "numeric",
			}).format(new Date()),
		};
	}
}
