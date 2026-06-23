import { useState } from "react";
import API from "../api/axios";

function CareerChatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "You",
      text: message,
    };

    setChat((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/ai/chat",
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChat((prev) => [
        ...prev,
        {
          sender: "CareerForge AI",
          text: res.data.reply,
        },
      ]);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 mt-10">

      <h2 className="text-2xl font-bold mb-4">
        🤖 Career AI Assistant
      </h2>

      <div className="border rounded-lg h-96 overflow-y-auto p-4 bg-gray-50">

        {chat.map((msg, index) => (
          <div key={index} className="mb-5">

            <strong>{msg.sender}</strong>

            <p className="mt-1 whitespace-pre-wrap">
              {msg.text}
            </p>

          </div>
        ))}

        {loading && (
          <p className="text-blue-600">
            AI is typing...
          </p>
        )}

      </div>

      <div className="flex gap-3 mt-5">

        <input
          type="text"
          placeholder="Ask career questions..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default CareerChatbot;