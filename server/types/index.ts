export interface UserType {
	id: string;
	name: string;
	room: string;
}

export interface MessageType {
	type: "admin" | "user";
	user: Pick<UserType, "id" | "name">;
	text: string;
	time: string;
}

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
