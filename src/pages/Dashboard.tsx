import { ProgressRing } from "@/components/dashboard/ProgressRing";
import { StatCard } from "@/components/dashboard/StatCard";
import { RoutineItem } from "@/components/routines/RoutineItem";
import { useState } from "react";
import { Target, Flame, TrendingUp, Calendar } from "lucide-react";

const initialRoutines = [
  { id: "1", title: "Morning meditation", time: "6:00 AM", completed: true },
  { id: "2", title: "Exercise - 30 min workout", time: "7:00 AM", completed: true },
  { id: "3", title: "Read for 20 minutes", time: "8:00 PM", completed: false },
  { id: "4", title: "Review daily goals", time: "9:00 PM", completed: false },
];

const Dashboard = () => {
  const [routines, setRoutines] = useState(initialRoutines);

  const completedCount = routines.filter((r) => r.completed).length;
  const totalCount = routines.length;
  const progress = Math.round((completedCount / totalCount) * 100);

  const handleToggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Good morning</h1>
        <p className="text-muted-foreground mt-1">
          Here's your progress for today
        </p>
      </div>

      {/* Main Progress Card */}
      <div className="glass-card rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ProgressRing progress={progress} size={160} strokeWidth={12}>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{progress}%</p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </ProgressRing>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Daily Progress
            </h2>
            <p className="text-muted-foreground mb-4">
              You've completed {completedCount} of {totalCount} tasks today.
              {progress < 100 && " Keep going!"}
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-sm text-muted-foreground">Remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Current Streak"
          value="12"
          subtitle="days"
          icon={Flame}
          trend={{ value: 20, positive: true }}
        />
        <StatCard
          title="Weekly Goal"
          value="85%"
          subtitle="on track"
          icon={Target}
        />
        <StatCard
          title="This Month"
          value="24"
          subtitle="routines done"
          icon={Calendar}
        />
        <StatCard
          title="Consistency"
          value="92%"
          subtitle="vs last week"
          icon={TrendingUp}
          trend={{ value: 5, positive: true }}
        />
      </div>

      {/* Today's Routines */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Today's Routines
          </h2>
          <span className="text-sm text-muted-foreground">
            {completedCount}/{totalCount} complete
          </span>
        </div>

        <div className="space-y-2">
          {routines.map((routine) => (
            <RoutineItem
              key={routine.id}
              {...routine}
              onToggle={handleToggleRoutine}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
