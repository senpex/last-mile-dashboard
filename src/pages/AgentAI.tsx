
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const AgentAI = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your delivery assistant. How can I help you today?"
    }
  ]);
  const [isHistoricalView, setIsHistoricalView] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input
    };
    
    // Add a simulated response
    const assistantMessage: Message = {
      role: "assistant",
      content: `I'm processing your request: "${input}". This is a simulated response as this is just a UI demonstration.`
    };
    
    setMessages([...messages, userMessage, assistantMessage]);
    setInput("");
  };

  return (
    <Layout>
      <div className="container max-w-5xl py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Agent AI Assistant</h1>
        </div>
        
        <Card className="h-[calc(100vh-160px)] flex flex-col">
          <CardHeader>
            <CardTitle>Delivery Assistant</CardTitle>
            <CardDescription>
              Ask questions about deliveries, routes, or get help with logistics
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message, i) => (
                  <div 
                    key={i} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`flex items-start gap-3 max-w-[80%] ${
                        message.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      } p-3 rounded-lg`}
                    >
                      <div className="h-8 w-8 rounded-full bg-background/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        {message.role === "user" ? (
                          <User className="h-5 w-5" />
                        ) : (
                          <Bot className="h-5 w-5" />
                        )}
                      </div>
                      <div className="prose-sm">{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {!isHistoricalView && (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input 
                  placeholder="Type your message..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AgentAI;
