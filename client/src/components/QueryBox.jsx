import { useState } from "react";

const QueryBox = ({ addMessage, setLoading }) => {
  const [query, setQuery] = useState("");

  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    // Add the user's query to the chat history
    addMessage({ type: "user", text: query });
    try {
      const result = await fetch("/api/gemini-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: query,
        }),
      });
      const data = await result.json();

      if (data.success === false) {
        setError("Failed to fetch response. Please try again.");
        return;
      }

      // Add AI's response to the chat history
      addMessage({ type: "ai", text: data.message });
      setQuery("");
    } catch (err) {
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500 my-2 text-center">{error}</p>}

      <div className="sticky bottom-0  py-4 ">
        <div className="flex items-center space-x-3">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-white p-3 border border-gray-700 bg-gray-800 rounded-lg focus:outline-none"
            rows="2"
            placeholder="Enter your query here..."
          />
          <button
            onClick={handleSend}
            className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-600"
          >
            "Send"
          </button>
        </div>
      </div>
    </>
  );
};

export default QueryBox;
