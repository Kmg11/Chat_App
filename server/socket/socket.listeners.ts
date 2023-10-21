import { SocketServerType } from "./socket.types";
import { sendRoomInfo, sendRoomList } from "./socket.events";
import { activatedUser, getUser, userLeave } from "./socket.state";
import { buildAdminMsg, buildMsg } from "./socket.utils";

export function handleSocketConnection(io: SocketServerType) {
	io.on("connection", (socket) => {
		sendRoomList(io);

		socket.on("enterRoom", ({ name, room }) => {
			const user = activatedUser({ id: socket.id, name, room });

			socket.join(user.room);
			socket.emit("message", buildAdminMsg(`Welcome to ${user.room}`));

			socket.broadcast
				.to(room)
				.emit("message", buildAdminMsg(`${user.name} has joined the chat`));

			sendRoomInfo(io, user.room);
		});

		socket.on("leaveRoom", () => {
			const user = getUser(socket.id);

			if (user) {
				userLeave(socket.id);

				socket.leave(user.room);

				io.to(user.room).emit(
					"message",
					buildAdminMsg(`${user.name} has left the chat`)
				);

				sendRoomInfo(io, user.room);
			}
		});

		socket.on("activity", () => {
			const user = getUser(socket.id);

			if (user?.room) {
				socket.broadcast.to(user?.room).emit("activity", { user });
			}
		});

		socket.on("message", ({ text }) => {
			const user = getUser(socket.id);

			if (user?.room) {
				io.to(user?.room).emit(
					"message",
					buildMsg({
						type: "user",
						user: { id: user.id, name: user.name },
						text,
					})
				);
			}
		});

		socket.on("disconnect", () => {
			const user = getUser(socket.id);
			userLeave(socket.id);

			if (user) {
				io.to(user.room).emit(
					"message",
					buildAdminMsg(`${user.name} has left the chat`)
				);

				sendRoomInfo(io, user.room);
			}
		});
	});
}
