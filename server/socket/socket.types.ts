import { Server } from "socket.io";
import { MessageType, UserType } from "../types";

export interface ClientToServerEvents {
	enterRoom: ({ name, room }: Pick<UserType, "name" | "room">) => void;
	leaveRoom: () => void;
	activity: () => void;
	message: ({ text }: Pick<MessageType, "text">) => void;
}

export interface ServerToClientEvents {
	message: (msg: MessageType) => void;
	userList: (obj: { users: UserType[] }) => void;
	roomList: (obj: { rooms: UserType["room"][] }) => void;
	activity: ({ user }: { user: UserType }) => void;
}

export type SocketServerType = Server<
	ClientToServerEvents,
	ServerToClientEvents
>;
