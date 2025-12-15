import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/coach/ChatMessage";
import { ChatInput } from "@/components/coach/ChatInput";
import { AlertTriangle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const excusePatterns = [
  "too tired",
  "no time",
  "tomorrow",
  "can't",
  "don't feel",
  "maybe later",
  "not today",
  "busy",
];

const detectExcuse = (message: string): boolean => {
  const lowerMessage = message.toLowerCase();
  return excusePatterns.some((pattern) => lowerMessage.includes(pattern));
};

const getAccountabilityResponse = (message: string): string => {
  const excuses = [
    `I noticed you said "${message.slice(0, 50)}..."

Let me be direct: this sounds like an excuse pattern.

You committed to your routines. The question isn't whether you feel like it—it's whether you'll honor your commitment.

What's the minimum action you can take right now? Even 2 minutes counts.`,
    `"${message.slice(0, 30)}..." — I've heard this before.

Here's the reality: the discomfort of action is temporary. The regret of inaction compounds.

Your past self made a commitment. Are you going to let them down?

What's the smallest step you can take right now?`,
    `Stop.

This is exactly the moment that separates people who build discipline from those who don't.

You don't need motivation. You need to start.

Tell me: what is ONE thing you can do in the next 5 minutes?`,
  ];

  return excuses[Math.floor(Math.random() * excuses.length)];
};

const getNormalResponse = (message: string): string => {
  const responses = [
    `Good question. Let me think about that.

Based on what you've shared, I'd suggest focusing on one change at a time. What feels most important to you right now?`,
    `I understand. Building discipline isn't about perfection—it's about consistency.

What would help you stay on track today?`,
    `That's a thoughtful observation. 

Remember: progress over perfection. Small wins compound into major changes.

How can I help you move forward?`,
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};

const Coach = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Welcome back.

I've reviewed your progress. You've completed 85% of your routines this week—that's solid consistency.

Today you have 4 remaining tasks. How are you feeling about them?`,
    },
  ]);
  const [isAccountabilityMode, setIsAccountabilityMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Detect excuse pattern
    const isExcuse = detectExcuse(content);

    // Simulate response delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isExcuse && !isAccountabilityMode) {
      setIsAccountabilityMode(true);
    }

    const responseContent = isExcuse
      ? getAccountabilityResponse(content)
      : getNormalResponse(content);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseContent,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);

    // Reset accountability mode after a non-excuse message
    if (!isExcuse && isAccountabilityMode) {
      setTimeout(() => setIsAccountabilityMode(false), 2000);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div
        className={cn(
          "flex items-center gap-3 p-4 border-b transition-colors duration-300",
          isAccountabilityMode
            ? "bg-accountability-bg border-accountability-border"
            : "border-border"
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
            isAccountabilityMode ? "bg-accountability-accent" : "bg-accent"
          )}
        >
          {isAccountabilityMode ? (
            <AlertTriangle
              className="h-5 w-5 text-accountability-bg"
            />
          ) : (
            <MessageCircle className="h-5 w-5 text-accent-foreground" />
          )}
        </div>

        <div>
          <h1
            className={cn(
              "font-semibold transition-colors",
              isAccountabilityMode
                ? "text-accountability-fg"
                : "text-foreground"
            )}
          >
            {isAccountabilityMode ? "Accountability Mode" : "AI Coach"}
          </h1>
          <p
            className={cn(
              "text-sm transition-colors",
              isAccountabilityMode
                ? "text-accountability-fg/70"
                : "text-muted-foreground"
            )}
          >
            {isAccountabilityMode
              ? "No excuses. Take action."
              : "Here to help you stay on track"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        className={cn(
          "flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-300",
          isAccountabilityMode && "bg-accountability-bg"
        )}
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            isAccountabilityMode={isAccountabilityMode && message.role === "assistant"}
          />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-soft" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-soft delay-100" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-soft delay-200" />
            </div>
            <span className="text-sm">Thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className={cn(
          "p-4 border-t transition-colors duration-300",
          isAccountabilityMode
            ? "bg-accountability-bg border-accountability-border"
            : "border-border"
        )}
      >
        <ChatInput
          onSend={handleSend}
          disabled={isLoading}
          isAccountabilityMode={isAccountabilityMode}
        />
      </div>
    </div>
  );
};

export default Coach;
