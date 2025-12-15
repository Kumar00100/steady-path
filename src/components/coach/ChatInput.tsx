import { useState } from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isAccountabilityMode?: boolean;
}

export const ChatInput = ({
  onSend,
  disabled = false,
  isAccountabilityMode = false,
}: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 p-3 rounded-2xl border transition-colors",
        isAccountabilityMode
          ? "bg-accountability-muted border-accountability-border"
          : "bg-card border-border"
      )}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className={cn(
          "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground",
          isAccountabilityMode && "text-accountability-fg placeholder:text-accountability-fg/50"
        )}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          "h-9 w-9 rounded-xl",
          isAccountabilityMode && "text-accountability-fg hover:bg-accountability-border"
        )}
      >
        <Mic className="h-4 w-4" />
      </Button>

      <Button
        type="submit"
        size="icon"
        disabled={!message.trim() || disabled}
        variant={isAccountabilityMode ? "accountability" : "default"}
        className="h-9 w-9 rounded-xl"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
