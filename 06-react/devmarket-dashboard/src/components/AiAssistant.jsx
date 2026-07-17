import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { summaryText } from "../data/dashboardData";

const AIAssistant = () => {
  const { isDark } = useTheme();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    setResponse("");

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: `You are an analytics assistant. Here is dashboard data:
${summaryText}
Answer this in 2-3 sentences: ${question}`,
            },
          ],
        }),
      });

      const text = await res.text();
      console.log("Raw response:", text);

      const data = JSON.parse(text);
      console.log("Parsed:", data);

      if (data.error) {
        setResponse(`API Error: ${data.error.message}`);
        return;
      }

      setResponse(data.content[0].text);
    } catch (err) {
      console.error("Full error:", err);
      setResponse(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What was my best day this week?",
    "Which category has the most orders?",
    "How is my refund rate trending?",
    "Give me a quick summary",
  ];

  return (
    <div
      className={`rounded-xl border p-6
                     ${
                       isDark
                         ? "bg-gray-900 border-gray-800"
                         : "bg-white border-gray-200"
                     }`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">🤖</span>
        <h3
          className={`text-base font-semibold
                         ${isDark ? "text-white" : "text-gray-900"}`}
        >
          AI Assistant
        </h3>
        <span
          className="text-xs bg-indigo-100 text-indigo-700
                         font-medium px-2 py-0.5 rounded-full"
        >
          Powered by Claude
        </span>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuestion(s)}
            className={`text-xs px-3 py-1.5 rounded-full
                        border transition-colors
                        ${
                          isDark
                            ? "border-gray-700 text-gray-400 hover:border-indigo-500 hover:text-indigo-400"
                            : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
                        }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askAI()}
          placeholder="Ask about your data..."
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm
                      border focus:outline-none
                      focus:ring-2 focus:ring-indigo-500
                      ${
                        isDark
                          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                      }`}
        />
        <button
          onClick={askAI}
          disabled={isLoading || !question.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white
                     font-semibold px-5 py-2.5 rounded-lg
                     transition-colors disabled:opacity-50
                     disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? "..." : "Ask"}
        </button>
      </div>

      {/* Response */}
      {isLoading && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      )}

      {response && !isLoading && (
        <div
          className={`rounded-lg p-4 border-l-4 border-indigo-500
                         ${isDark ? "bg-gray-800" : "bg-indigo-50"}`}
        >
          <p
            className={`text-sm leading-relaxed
                         ${isDark ? "text-gray-300" : "text-gray-700"}`}
          >
            {response}
          </p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
