const socket = io();

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// --- TTS Functionality ---
let synth = null;
let utterance = null;

function initTTS() {
  if ("speechSynthesis" in window) {
    synth = window.speechSynthesis;
    utterance = new SpeechSynthesisUtterance();
    // Optional: Set language if needed, defaults to browser's language
    // utterance.lang = 'en-US';
    // utterance.rate = 1; // Speed of speech
    // utterance.pitch = 1; // Pitch of speech
    console.log("Text-to-Speech is supported.");
  } else {
    console.warn("Text-to-Speech is not supported in this browser.");
  }
}

function speakMessage(text) {
  if (synth && utterance) {
    utterance.text = text;
    // Ensure speaking only happens if TTS is actually enabled by the server
    synth.speak(utterance);
  }
}

// Initialize TTS when the script loads
initTTS();
// --- End TTS Functionality ---

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

// Modified to expect an object { message, ttsEnabled }
socket.on("chat message", (data) => {
  const { message, ttsEnabled } = data;

  const item = document.createElement("li");
  item.textContent = message;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight); // Auto-scroll to bottom

  // Speak the received message using TTS ONLY IF enabled by the server
  if (ttsEnabled) {
    speakMessage(message);
  }
});
