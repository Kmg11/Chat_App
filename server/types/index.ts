export interface UserType {
	id: string;
	name: string;
	room: string;
}

export interface MessageType {
	name: UserType["name"];
	text: string;
	time: string;
}

export interface ClientToServerEvents {
	enterRoom: ({ name, room }: Pick<UserType, "name" | "room">) => void;
	leaveRoom: () => void;
	activity: (name: string) => void;
	message: ({ text }: Pick<MessageType, "name" | "text">) => void;
}

export interface ServerToClientEvents {
	message: (msg: MessageType) => void;
	userList: (obj: { users: UserType[] }) => void;
	roomList: (obj: { rooms: UserType["room"][] }) => void;
	activity: (name: string) => void;
}
