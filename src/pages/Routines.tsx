import { useState } from "react";
import { RoutineItem } from "@/components/routines/RoutineItem";
import { Button } from "@/components/ui/button";
import { Plus, Calendar } from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialRoutines = [
  { id: "1", title: "Wake up at 6 AM", time: "6:00 AM", completed: true, category: "morning" },
  { id: "2", title: "Cold shower", time: "6:15 AM", completed: true, category: "morning" },
  { id: "3", title: "Morning meditation - 15 min", time: "6:30 AM", completed: true, category: "morning" },
  { id: "4", title: "Exercise - Strength training", time: "7:00 AM", completed: false, category: "morning" },
  { id: "5", title: "Healthy breakfast", time: "8:00 AM", completed: false, category: "morning" },
  { id: "6", title: "Deep work session - 2 hours", time: "9:00 AM", completed: false, category: "work" },
  { id: "7", title: "Evening walk - 30 min", time: "6:00 PM", completed: false, category: "evening" },
  { id: "8", title: "Read for 30 minutes", time: "9:00 PM", completed: false, category: "evening" },
  { id: "9", title: "Journal & reflection", time: "9:30 PM", completed: false, category: "evening" },
  { id: "10", title: "Sleep by 10 PM", time: "10:00 PM", completed: false, category: "evening" },
];

const weeklyData = [
  { day: "Mon", completed: 8, total: 10 },
  { day: "Tue", completed: 9, total: 10 },
  { day: "Wed", completed: 7, total: 10 },
  { day: "Thu", completed: 10, total: 10 },
  { day: "Fri", completed: 6, total: 10 },
  { day: "Sat", completed: 8, total: 10 },
  { day: "Sun", completed: 3, total: 10 },
];

const Routines = () => {
  const [routines, setRoutines] = useState(initialRoutines);
  const [selectedDay, setSelectedDay] = useState(6); // Sunday (current day)

  const handleToggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  const morningRoutines = routines.filter((r) => r.category === "morning");
  const workRoutines = routines.filter((r) => r.category === "work");
  const eveningRoutines = routines.filter((r) => r.category === "evening");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Routines</h1>
          <p className="text-muted-foreground mt-1">
            Build consistency through daily habits
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Routine
        </Button>
      </div>

      {/* Weekly Overview */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">This Week</h2>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weeklyData.map((day, index) => {
            const percentage = Math.round((day.completed / day.total) * 100);
            const isSelected = index === selectedDay;

            return (
              <button
                key={day.day}
                onClick={() => setSelectedDay(index)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <span className="text-xs font-medium mb-2">{day.day}</span>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isSelected
                      ? "bg-primary-foreground/20"
                      : percentage === 100
                      ? "bg-success/20 text-success"
                      : percentage >= 70
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {percentage}%
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Routine Sections */}
      <div className="space-y-6">
        {/* Morning */}
        <section>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Morning Routine
          </h3>
          <div className="space-y-2">
            {morningRoutines.map((routine) => (
              <RoutineItem
                key={routine.id}
                {...routine}
                onToggle={handleToggleRoutine}
              />
            ))}
          </div>
        </section>

        {/* Work */}
        <section>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Work & Focus
          </h3>
          <div className="space-y-2">
            {workRoutines.map((routine) => (
              <RoutineItem
                key={routine.id}
                {...routine}
                onToggle={handleToggleRoutine}
              />
            ))}
          </div>
        </section>

        {/* Evening */}
        <section>
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Evening Routine
          </h3>
          <div className="space-y-2">
            {eveningRoutines.map((routine) => (
              <RoutineItem
                key={routine.id}
                {...routine}
                onToggle={handleToggleRoutine}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Routines;
