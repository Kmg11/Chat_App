import express from "express";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3500;
const ADMIN = "Admin";
const app = express();

app.use(express.static(path.join(__dirname, "public")));

const appServer = app.listen(PORT, () => {
	console.log("Server listening on port 3500");
});

// * State
const UsersState = {
	users: [],
	setUsers: function (newUsers) {
		this.users = newUsers;
	},
};

const io = new Server(appServer, {
	cors: {
		origin:
			process.env.NODE_ENV === "production" ? false : ["http://127.0.0.1:5500"],
	},
});

io.on("connection", (socket) => {
	console.log(`User ${socket.id} connected.`);

	socket.on("enterRoom", ({ name, room }) => {
		// * Leave previous room
		const previousRoom = getUser(socket.id)?.room;

		if (previousRoom) {
			socket.leave(previousRoom);

			io.to(previousRoom).emit(
				"message",
				buildMsg(ADMIN, `${name} has left the chat`)
			);
		}

		const user = activatedUser(socket.id, name, room);

		// * Cannot update previous room users list until after the state update in activated user
		if (previousRoom) {
			io.to(previousRoom).emit("userList", {
				users: getUsersInRoom(previousRoom),
			});
		}

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

		console.log(`User ${socket.id} disconnected.`);
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

		console.log(UsersState.users);
		console.log("room", room);

		if (room) {
			io.to(room).emit("message", buildMsg(name, text));
		}
	});
});

function buildMsg(name, text) {
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

// * User functions
function activatedUser(id, name, room) {
	const user = { id, name, room };

	UsersState.setUsers([...UsersState.users.filter((u) => u.id !== id), user]);

	return user;
}

function userLeave(id) {
	UsersState.setUsers(UsersState.users.filter((u) => u.id !== id));
}

function getUser(id) {
	return UsersState.users.find((u) => u.id === id);
}

function getUsersInRoom(room) {
	return UsersState.users.filter((u) => u.room === room);
}

function getAllActiveRooms() {
	return [...new Set(UsersState.users.map((u) => u.room))];
}
