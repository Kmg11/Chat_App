import { MessageType } from "../types";

export function buildMsg({
	user,
	text,
	type = "user",
}: Omit<MessageType, "time">): MessageType {
	return {
		type,
		user,
		text,
		time: new Intl.DateTimeFormat("default", {
			hour: "numeric",
			minute: "numeric",
			second: "numeric",
		}).format(new Date()),
	};
}

export function buildAdminMsg(text: MessageType["text"]): MessageType {
	return buildMsg({ text, user: { id: "", name: "admin" }, type: "admin" });
}
