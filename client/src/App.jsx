import { useState } from "react";
import ChatBox from "./components/ChatBox";
import QueryBox from "./components/QueryBox";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);

  const addMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }

  const handleResponse = (flag) => {
    setLoadingResponse(flag);
  }

  return (
    <main className="bg-gray-900">
    <div className="max-w-3xl mx-auto h-screen flex flex-col p-1">
      <h1 className="text-lg font-bold text-center shadow-lg rounded-full py-1 text-sky-300 my-4">
        Ask Google Gemini
      </h1>
      <ChatBox messages={messages} loading={loadingResponse} />
      <QueryBox addMessage={addMessage} setLoading={handleResponse} />
    </div>
    </main>
  );
};

export default App;
