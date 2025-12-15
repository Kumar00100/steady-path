import { Utensils, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface FoodEntryProps {
  id: string;
  name: string;
  time: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  notes?: string;
}

const mealTypeConfig = {
  breakfast: { label: "Breakfast", color: "bg-amber-100 text-amber-700" },
  lunch: { label: "Lunch", color: "bg-emerald-100 text-emerald-700" },
  dinner: { label: "Dinner", color: "bg-blue-100 text-blue-700" },
  snack: { label: "Snack", color: "bg-purple-100 text-purple-700" },
};

export const FoodEntry = ({
  name,
  time,
  mealType,
  notes,
}: FoodEntryProps) => {
  const config = mealTypeConfig[mealType];

  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
        <Utensils className="h-5 w-5 text-accent-foreground" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-medium text-foreground">{name}</p>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              config.color
            )}
          >
            {config.label}
          </span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          <span className="text-xs">{time}</span>
        </div>

        {notes && (
          <p className="mt-2 text-sm text-muted-foreground">{notes}</p>
        )}
      </div>
    </div>
  );
};
