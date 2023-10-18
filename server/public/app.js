const socket = io("ws://localhost:3500");

const msgInput = document.querySelector("#message");
const nameInput = document.querySelector("#name");
const roomInput = document.querySelector("#room");

const activity = document.querySelector(".activity");
const userList = document.querySelector(".user-list");
const roomList = document.querySelector(".room-list");
const chatDisplay = document.querySelector(".chat-display");

function sendMessage(e) {
	e.preventDefault();

	if (nameInput.value && msgInput.value && roomInput.value) {
		socket.emit("message", { name: nameInput.value, text: msgInput.value });
		msgInput.value = "";
	}

	msgInput.focus();
}

document.querySelector(".form-msg").addEventListener("submit", sendMessage);

function enterRoom(e) {
	e.preventDefault();

	if (nameInput.value && roomInput.value) {
		socket.emit("enterRoom", {
			name: nameInput.value,
			room: roomInput.value,
		});
	}
}

document.querySelector(".form-join").addEventListener("submit", enterRoom);

msgInput.addEventListener("keypress", () => {
	socket.emit("activity", nameInput.value);
});

// * Listen for messages from the server
socket.on("message", ({ name, text, time }) => {
	activity.textContent = "";
	const message = document.createElement("li");
	message.classList = "post";

	if (name === nameInput.value) message.classList.add("post--left");
	if (name !== nameInput.value && name !== "Admin") {
		message.classList.add("post--right");
	}

	if (name !== "Admin") {
		message.innerHTML = `
			<div class="post__header post__header--${
				name === nameInput.value ? "user" : "reply"
			}">
				<span class="post__header--name">${name}</span>
				<span class="post__header--time">${time}</span>
			</div>

			<div class="post__text">${text}</div>
		`;
	} else {
		message.innerHTML = `<div class="post__text">${text}</div>`;
	}

	chatDisplay.appendChild(message);
	chatDisplay.scrollTop = chatDisplay.scrollHeight;
});

// * Listen for user activity
let activityTimer;
socket.on("activity", (data) => {
	activity.textContent = data + " is typing...";

	clearTimeout(activityTimer);
	activityTimer = setTimeout(() => {
		activity.textContent = "";
	}, 1000);
});

socket.on("userList", ({ users }) => {
	showUsers(users);
});

socket.on("roomList", ({ rooms }) => {
	showRooms(rooms);
});

function showUsers(users) {
	userList.textContent = "";
	if (users.length) {
		userList.innerHTML = `<em>Users in ${roomInput.value}:</em>`;

		users.forEach((user, i) => {
			userList.textContent += ` ${user.name}`;

			if (users.length > 1 && i !== users.length - 1) {
				userList.textContent += ",";
			}
		});
	}
}

function showRooms(rooms) {
	roomList.textContent = "";

	if (rooms.length) {
		roomList.innerHTML = `<em>Active rooms:</em>`;

		rooms.forEach((room, i) => {
			roomList.textContent += ` ${room}`;

			if (rooms.length > 1 && i !== rooms.length - 1) {
				roomList.textContent += ",";
			}
		});
	}
}
