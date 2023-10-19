export interface UserType {
	id: string;
	name: string;
	room: string;
}

export interface messageType {
	name: UserType["name"];
	text: string;
	time: string;
}

export interface ClientToServerEvents {
	enterRoom: ({ name, room }: Pick<UserType, "name" | "room">) => void;
	activity: (name: string) => void;
	message: ({ name, text }: Pick<messageType, "name" | "text">) => void;
}

export interface ServerToClientEvents {
	message: (msg: messageType) => void;
	userList: (obj: { users: UserType[] }) => void;
	roomList: (obj: { rooms: UserType["room"][] }) => void;
	activity: (name: string) => void;
}
