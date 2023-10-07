const socket = io("ws://localhost:3500");

const form = document.querySelector("form");
const msgInput = document.querySelector("input");
const activity = document.querySelector(".activity");

function sendMessage(e) {
	e.preventDefault();

	if (msgInput.value) {
		socket.emit("message", msgInput.value);
		msgInput.value = "";
	}

	msgInput.focus();
}

form.addEventListener("submit", sendMessage);

// * Listen for messages from the server
socket.on("message", (data) => {
	activity.textContent = "";
	const message = document.createElement("li");
	message.textContent = data;
	document.querySelector("ul").appendChild(message);
});

msgInput.addEventListener("keypress", () => {
	socket.emit("activity", socket.id.substring(0, 5));
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
