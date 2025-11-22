import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send } from "lucide-react";
import { aiChatHistory } from "@/data/mockData";

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(aiChatHistory);
  const [inputMessage, setInputMessage] = useState("");

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user" as const,
      message: inputMessage,
    };

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      type: "ai" as const,
      message:
        "I understand your query. As the BOC Audit Assistant, I can help you with audit planning, risk assessments, team management, and more. How can I assist you specifically?",
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputMessage("");
  };

  return (
    <>
      {/* AI Chat Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] bg-gradient-to-r from-gold to-gold-rich text-black font-bold rounded-full shadow-[0_6px_16px_rgba(212,175,55,0.4)] hover:scale-105 hover:shadow-[0_8px_20px_rgba(212,175,55,0.6)] transition-all duration-300"
        size="lg"
      >
        <MessageSquare className="h-5 w-5 mr-2" />
        AI Assistant
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-28 right-8 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-[1000] flex flex-col animate-slide-up border border-gray-200 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gold to-gold-rich text-black p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-gold" />
              </div>
              <h3 className="font-bold text-lg">BOC AI Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-black/10 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-5 overflow-y-auto bg-[#fafafa] space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                    msg.type === "user"
                      ? "bg-white border border-gray-200 text-gray-900 rounded-br-sm"
                      : "bg-gradient-to-br from-gold/15 to-gold/25 border border-gold/30 text-gray-900 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-white flex gap-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-full border-gray-300"
            />
            <Button
              onClick={handleSend}
              size="icon"
              className="rounded-full bg-gold text-black hover:bg-gold-rich transition-all hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
