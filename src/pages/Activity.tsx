import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  Play,
  MapPin,
  Clock,
  Footprints,
  Flame,
  Calendar,
  Route,
} from "lucide-react";

interface ActivityRecord {
  id: string;
  type: "walk" | "run" | "workout";
  date: string;
  duration: string;
  distance?: string;
  calories: number;
}

const recentActivities: ActivityRecord[] = [
  {
    id: "1",
    type: "walk",
    date: "Today",
    duration: "35 min",
    distance: "2.8 km",
    calories: 180,
  },
  {
    id: "2",
    type: "workout",
    date: "Yesterday",
    duration: "45 min",
    calories: 320,
  },
  {
    id: "3",
    type: "run",
    date: "Dec 13",
    duration: "28 min",
    distance: "4.2 km",
    calories: 290,
  },
  {
    id: "4",
    type: "walk",
    date: "Dec 12",
    duration: "20 min",
    distance: "1.5 km",
    calories: 95,
  },
];

const activityTypeConfig = {
  walk: { label: "Walk", icon: Footprints, color: "text-emerald-500" },
  run: { label: "Run", icon: Route, color: "text-blue-500" },
  workout: { label: "Workout", icon: Flame, color: "text-orange-500" },
};

const Activity = () => {
  const [isTracking, setIsTracking] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Activity</h1>
          <p className="text-muted-foreground mt-1">
            Track workouts, walks, and movement
          </p>
        </div>
      </div>

      {/* Start Activity Card */}
      <div className="glass-card rounded-2xl p-8 text-center">
        {isTracking ? (
          <div className="space-y-6">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto animate-pulse-soft">
              <MapPin className="h-10 w-10 text-primary" />
            </div>

            <div>
              <p className="text-4xl font-bold text-foreground">00:12:34</p>
              <p className="text-muted-foreground mt-1">Duration</p>
            </div>

            <div className="flex justify-center gap-8">
              <div>
                <p className="text-xl font-semibold text-foreground">1.2 km</p>
                <p className="text-sm text-muted-foreground">Distance</p>
              </div>
              <div>
                <p className="text-xl font-semibold text-foreground">85</p>
                <p className="text-sm text-muted-foreground">Calories</p>
              </div>
            </div>

            <Button
              variant="destructive"
              size="lg"
              onClick={() => setIsTracking(false)}
            >
              Stop Activity
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto">
              <Play className="h-10 w-10 text-accent-foreground ml-1" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Start an Activity
              </h2>
              <p className="text-muted-foreground mt-1">
                Track your walk, run, or workout with GPS
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsTracking(true)}
              >
                <Footprints className="h-4 w-4" />
                Walk
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsTracking(true)}
              >
                <Route className="h-4 w-4" />
                Run
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setIsTracking(true)}
              >
                <Flame className="h-4 w-4" />
                Workout
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Weekly Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="This Week"
          value="5"
          subtitle="activities"
          icon={Calendar}
        />
        <StatCard
          title="Total Distance"
          value="12.3"
          subtitle="km"
          icon={Route}
        />
        <StatCard
          title="Active Time"
          value="3.5"
          subtitle="hours"
          icon={Clock}
        />
        <StatCard
          title="Calories"
          value="1,240"
          subtitle="burned"
          icon={Flame}
        />
      </div>

      {/* Recent Activities */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Recent Activities
        </h2>

        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const config = activityTypeConfig[activity.type];
            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Icon className={`h-5 w-5 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">
                      {config.label}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {activity.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activity.duration}
                    </span>
                    {activity.distance && (
                      <span className="flex items-center gap-1">
                        <Route className="h-3 w-3" />
                        {activity.distance}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Flame className="h-3 w-3" />
                      {activity.calories} cal
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Activity;
