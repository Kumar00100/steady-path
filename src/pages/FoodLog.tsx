import { useState } from "react";
import { FoodEntry } from "@/components/food/FoodEntry";
import { Button } from "@/components/ui/button";
import { Plus, Droplets, Apple, Flame } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const initialEntries = [
  {
    id: "1",
    name: "Oatmeal with berries and nuts",
    time: "7:30 AM",
    mealType: "breakfast" as const,
    notes: "Added honey, felt energized after",
  },
  {
    id: "2",
    name: "Grilled chicken salad",
    time: "12:30 PM",
    mealType: "lunch" as const,
    notes: "Mixed greens, olive oil dressing",
  },
  {
    id: "3",
    name: "Apple with almond butter",
    time: "3:30 PM",
    mealType: "snack" as const,
  },
];

const FoodLog = () => {
  const [entries] = useState(initialEntries);
  const [waterGlasses, setWaterGlasses] = useState(5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Food Log</h1>
          <p className="text-muted-foreground mt-1">
            Track what you eat, build awareness
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Log Meal
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Meals Today"
          value={entries.length}
          subtitle="logged"
          icon={Apple}
        />
        <StatCard
          title="Water"
          value={`${waterGlasses}/8`}
          subtitle="glasses"
          icon={Droplets}
        />
        <StatCard
          title="Streak"
          value="7"
          subtitle="days logging"
          icon={Flame}
        />
      </div>

      {/* Water Tracker */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-blue-500" />
            <h2 className="font-semibold text-foreground">Water Intake</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            {waterGlasses} of 8 glasses
          </span>
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setWaterGlasses(index + 1)}
              className={`flex-1 h-12 rounded-lg transition-all ${
                index < waterGlasses
                  ? "bg-blue-500/20 border-2 border-blue-500"
                  : "bg-muted border-2 border-transparent hover:border-blue-500/30"
              }`}
            >
              <Droplets
                className={`h-5 w-5 mx-auto ${
                  index < waterGlasses ? "text-blue-500" : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Today's Meals */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Today's Meals
        </h2>

        {entries.length > 0 ? (
          <div className="space-y-3">
            {entries.map((entry) => (
              <FoodEntry key={entry.id} {...entry} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-8 text-center">
            <Apple className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No meals logged yet today.
            </p>
            <Button variant="soft" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Log your first meal
            </Button>
          </div>
        )}
      </div>

      {/* AI Guidance */}
      <div className="glass-card rounded-2xl p-6 border-l-4 border-primary">
        <h3 className="font-semibold text-foreground mb-2">
          Coach's Observation
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Good variety today. You've included protein with each meal and stayed
          hydrated. Consider adding more vegetables to your dinner. Consistency
          in logging helps build awareness of your eating patterns.
        </p>
      </div>
    </div>
  );
};

export default FoodLog;
