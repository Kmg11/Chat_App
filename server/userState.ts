import { UserType } from "./types";

interface UsersStateType {
	users: UserType[];
	setUsers: (newUsers: UserType[]) => void;
}

export const UsersState: UsersStateType = {
	users: [],
	setUsers: function (newUsers) {
		this.users = newUsers;
	},
};

export function activatedUser(user: UserType) {
	UsersState.setUsers([
		...UsersState.users.filter((u) => u.id !== user.id),
		user,
	]);

	return user;
}

export function userLeave(id: UserType["id"]) {
	UsersState.setUsers(UsersState.users.filter((u) => u.id !== id));
}

export function getUser(id: UserType["id"]) {
	return UsersState.users.find((u) => u.id === id);
}

export function getUsersInRoom(room: UserType["room"]) {
	return UsersState.users.filter((u) => u.room === room);
}

export function getAllActiveRooms() {
	return [...new Set(UsersState.users.map((u) => u.room))];
}
