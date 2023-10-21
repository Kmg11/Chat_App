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
