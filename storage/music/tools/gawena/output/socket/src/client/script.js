const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  // Apply Bootstrap list-group-item class for styling
  item.classList.add("list-group-item", "bg-light", "text-dark", "mb-2"); // Example styling
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight); // Auto-scroll to bottom
});
