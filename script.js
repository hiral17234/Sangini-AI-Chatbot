const API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // 🔐 Replace this with your real API key

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  addMessage("bot", "Typing...");

  const chatBox = document.getElementById("chat-box");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Sangini AI, a caring, friendly, helpful assistant built by Aashu." },
          { role: "user", content: message }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
    
    // Remove "Typing..." and add actual reply
    chatBox.removeChild(chatBox.lastChild);
    addMessage("bot", reply.trim());

  } catch (err) {
    chatBox.removeChild(chatBox.lastChild);
    addMessage("bot", "⚠️ Error talking to server.");
    console.error(err);
  }
}

function addMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
