import { useState } from "react";
import { Check, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoutineItemProps {
  id: string;
  title: string;
  time?: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

export const RoutineItem = ({
  id,
  title,
  time,
  completed,
  onToggle,
}: RoutineItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    onToggle(id);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left group",
        completed
          ? "bg-accent/50"
          : "bg-card hover:bg-accent/30 border border-border"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/30 group-hover:border-primary/50",
          isAnimating && "scale-110"
        )}
      >
        {completed && <Check className="h-3.5 w-3.5 text-primary-foreground" />}
      </div>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium transition-colors",
            completed ? "text-muted-foreground line-through" : "text-foreground"
          )}
        >
          {title}
        </p>
        {time && (
          <div className="flex items-center gap-1 mt-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{time}</span>
          </div>
        )}
      </div>
    </button>
  );
};
