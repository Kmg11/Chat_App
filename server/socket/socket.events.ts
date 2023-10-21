import { SocketServerType, UserType } from "../types";
import { getAllActiveRooms, getUsersInRoom } from "./socket.state";

export function sendRoomList(io: SocketServerType) {
	io.emit("roomList", { rooms: getAllActiveRooms() });
}

export function sendUsersList(io: SocketServerType, room: UserType["room"]) {
	io.to(room).emit("userList", { users: getUsersInRoom(room) });
}

export function sendRoomInfo(io: SocketServerType, room: UserType["room"]) {
	sendUsersList(io, room);
	sendRoomList(io);
}
