import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isAccountabilityMode?: boolean;
}

export const ChatMessage = ({
  role,
  content,
  isAccountabilityMode = false,
}: ChatMessageProps) => {
  const isBot = role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div
          className={cn(
            "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
            isAccountabilityMode
              ? "bg-accountability-accent"
              : "bg-accent"
          )}
        >
          <Bot
            className={cn(
              "h-4 w-4",
              isAccountabilityMode
                ? "text-accountability-bg"
                : "text-accent-foreground"
            )}
          />
        </div>
      )}

      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isBot
            ? isAccountabilityMode
              ? "bg-accountability-muted text-accountability-fg rounded-tl-md"
              : "bg-card border border-border rounded-tl-md"
            : "bg-primary text-primary-foreground rounded-tr-md"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>

      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
      )}
    </div>
  );
};
