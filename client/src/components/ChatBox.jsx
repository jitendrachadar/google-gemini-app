import ReactMarkdown from "react-markdown";

const ChatBox = ({ messages, loading }) => {
  return (
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
              <ReactMarkdown
                className="prose"
                components={{
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
                  ),
                }}
              >
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
  );
};

export default ChatBox;
