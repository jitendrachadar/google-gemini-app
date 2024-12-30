import { useState } from "react";
import ReactMarkdown from "react-markdown";

const QueryInput = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]); // To store the chat history

  const handleSubmit = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    // Add the user's query to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", text: query },
    ]);

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
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", text: data.message },
      ]);
      setQuery(""); // Clear the input field
    } catch (err) {
      setError("Failed to fetch response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col p-1">
      <h1 className="text-lg font-bold text-center shadow-lg rounded-full py-1 text-sky-300 my-4">
        Ask Google Gemini
      </h1>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto space-y-8 px-4 py-4  rounded-t-lg shadow-md">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`py-2 px-4 text-gray-100 ${
                message.type === "user"
                  ? "  max-w-[75%] bg-sky-900 rounded-xl"
                  : ""
              }`}
            >
              {message.type === "user" ? (
                `${message.text}`
              ) : (
                <ReactMarkdown className="prose"
                components={{
                  
                  // Customize headings
                  strong: ({ node, ...props }) => (
                    <strong className="text-gray-200 font-bolder" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="text-gray-300" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-gray-300" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code className="text-gray-500" {...props} />
                  )
                }}>
                  {message.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <p className="text-orange-200">Loading...</p>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 my-2 text-center">{error}</p>}

      {/* Input Area */}
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
            onClick={handleSubmit}
            className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-600"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryInput;
