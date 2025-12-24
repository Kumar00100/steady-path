import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  Dumbbell, 
  Timer, 
  Flame, 
  TrendingUp, 
  Play, 
  Pause, 
  RotateCcw,
  Target,
  Calendar
} from "lucide-react";

interface WorkoutExercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: string;
  completed: boolean;
}

const workoutPlans = [
  {
    id: "1",
    name: "Full Body Strength",
    duration: "45 min",
    difficulty: "Intermediate",
    exercises: [
      { id: "1", name: "Squats", sets: 4, reps: 12, weight: "60kg", completed: false },
      { id: "2", name: "Bench Press", sets: 4, reps: 10, weight: "50kg", completed: false },
      { id: "3", name: "Deadlift", sets: 3, reps: 8, weight: "80kg", completed: false },
      { id: "4", name: "Shoulder Press", sets: 3, reps: 12, weight: "20kg", completed: false },
      { id: "5", name: "Pull-ups", sets: 3, reps: 10, completed: false },
    ]
  },
  {
    id: "2", 
    name: "HIIT Cardio",
    duration: "30 min",
    difficulty: "Advanced",
    exercises: [
      { id: "1", name: "Burpees", sets: 4, reps: 15, completed: false },
      { id: "2", name: "Mountain Climbers", sets: 4, reps: 20, completed: false },
      { id: "3", name: "Jump Squats", sets: 4, reps: 15, completed: false },
      { id: "4", name: "High Knees", sets: 4, reps: 30, completed: false },
    ]
  },
  {
    id: "3",
    name: "Core Crusher",
    duration: "20 min", 
    difficulty: "Beginner",
    exercises: [
      { id: "1", name: "Plank", sets: 3, reps: 60, completed: false },
      { id: "2", name: "Crunches", sets: 3, reps: 20, completed: false },
      { id: "3", name: "Russian Twists", sets: 3, reps: 20, completed: false },
      { id: "4", name: "Leg Raises", sets: 3, reps: 15, completed: false },
    ]
  }
];

const Workout = () => {
  const [activeWorkout, setActiveWorkout] = useState<typeof workoutPlans[0] | null>(null);
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const startWorkout = (workout: typeof workoutPlans[0]) => {
    setActiveWorkout(workout);
    setExercises(workout.exercises.map(e => ({ ...e, completed: false })));
    setElapsedTime(0);
    setIsRunning(true);
  };

  const toggleExercise = (id: string) => {
    setExercises(prev => 
      prev.map(ex => ex.id === id ? { ...ex, completed: !ex.completed } : ex)
    );
  };

  const resetWorkout = () => {
    setActiveWorkout(null);
    setExercises([]);
    setIsRunning(false);
    setElapsedTime(0);
  };

  const completedCount = exercises.filter(e => e.completed).length;
  const progress = exercises.length > 0 ? (completedCount / exercises.length) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-32">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Workout</h1>
            <p className="text-muted-foreground">Build strength & endurance</p>
          </div>
          <div className="p-3 rounded-full bg-primary/10">
            <Dumbbell className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            title="This Week"
            value="5"
            icon={Calendar}
            subtitle="workouts"
          />
          <StatCard
            title="Calories"
            value="2,450"
            icon={Flame}
            subtitle="burned"
          />
          <StatCard
            title="Streak"
            value="12"
            icon={TrendingUp}
            subtitle="days"
          />
        </div>

        {/* Active Workout */}
        {activeWorkout ? (
          <Card className="border-primary/20 bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{activeWorkout.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className={getDifficultyColor(activeWorkout.difficulty)}>
                      {activeWorkout.difficulty}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Timer className="h-3 w-3" />
                      {activeWorkout.duration}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-primary">
                    {formatTime(elapsedTime)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {completedCount}/{exercises.length} completed
                  </div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 mt-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </CardHeader>
            
            <CardContent className="space-y-2">
              {exercises.map((exercise) => (
                <button
                  key={exercise.id}
                  onClick={() => toggleExercise(exercise.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all ${
                    exercise.completed 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-muted/30 border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      exercise.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                    }`}>
                      {exercise.completed && (
                        <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={exercise.completed ? 'line-through text-muted-foreground' : 'text-foreground'}>
                      {exercise.name}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exercise.sets}×{exercise.reps} {exercise.weight && `@ ${exercise.weight}`}
                  </div>
                </button>
              ))}
              
              <div className="flex gap-2 pt-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setIsRunning(!isRunning)}
                >
                  {isRunning ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isRunning ? 'Pause' : 'Resume'}
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={resetWorkout}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Workout Plans */
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Workout Plans
            </h2>
            
            {workoutPlans.map((workout) => (
              <Card 
                key={workout.id} 
                className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer"
                onClick={() => startWorkout(workout)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{workout.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className={getDifficultyColor(workout.difficulty)}>
                          {workout.difficulty}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Timer className="h-3 w-3" />
                          {workout.duration}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          • {workout.exercises.length} exercises
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <Play className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;
