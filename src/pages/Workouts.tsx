import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Play, Clock, Dumbbell, ChevronRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Workout {
  id: string;
  name: string;
  type: "push" | "pull" | "legs" | "upper" | "lower" | "full";
  exercises: number;
  duration: string;
  lastCompleted?: string;
  scheduled?: string;
}

const workouts: Workout[] = [
  { id: "1", name: "Push Day - Chest & Shoulders", type: "push", exercises: 6, duration: "60 min", scheduled: "Today" },
  { id: "2", name: "Pull Day - Back & Biceps", type: "pull", exercises: 6, duration: "55 min", scheduled: "Tomorrow" },
  { id: "3", name: "Leg Day - Quads & Glutes", type: "legs", exercises: 5, duration: "65 min", scheduled: "Thursday" },
  { id: "4", name: "Upper Body Hypertrophy", type: "upper", exercises: 8, duration: "70 min", lastCompleted: "3 days ago" },
  { id: "5", name: "Lower Body Strength", type: "lower", exercises: 5, duration: "60 min", lastCompleted: "5 days ago" },
];

const typeColors: Record<string, string> = {
  push: "bg-red-500/20 text-red-400 border-red-500/30",
  pull: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  legs: "bg-green-500/20 text-green-400 border-green-500/30",
  upper: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  lower: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  full: "bg-primary/20 text-primary border-primary/30",
};

export default function Workouts() {
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);

  const scheduledWorkouts = workouts.filter(w => w.scheduled);
  const recentWorkouts = workouts.filter(w => w.lastCompleted);

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-4xl tracking-wide text-foreground">
            YOUR <span className="text-primary titan-text-glow">WORKOUTS</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and track your training sessions</p>
        </div>
        <Button 
          onClick={() => navigate("/workouts/new")}
          className="titan-gradient titan-glow text-primary-foreground font-semibold px-6"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Workout
        </Button>
      </div>

      {/* Scheduled Section */}
      <div>
        <h2 className="font-display text-lg md:text-xl tracking-wide text-foreground mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          SCHEDULED
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scheduledWorkouts.map((workout) => (
            <Card 
              key={workout.id}
              className={cn(
                "glass-card border-border/50 cursor-pointer transition-all duration-200 hover:border-primary/50",
                selectedWorkout === workout.id && "border-primary ring-1 ring-primary/20"
              )}
              onClick={() => navigate(`/workouts/${workout.id}`)}
            >
              <CardContent className="p-4 md:p-5">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={cn("uppercase text-xs", typeColors[workout.type])}>
                    {workout.type}
                  </Badge>
                  <span className="text-xs font-semibold text-primary uppercase">
                    {workout.scheduled}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-3 text-sm md:text-base">{workout.name}</h3>
                <div className="flex items-center gap-4 text-xs md:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Dumbbell className="w-4 h-4" />
                    {workout.exercises} exercises
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {workout.duration}
                  </span>
                </div>
                <Button 
                  className="w-full mt-4 titan-gradient text-primary-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/workouts/${workout.id}`);
                  }}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Workout
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Section */}
      <div>
        <h2 className="font-display text-lg md:text-xl tracking-wide text-foreground mb-4 flex items-center gap-2">
          <Check className="w-5 h-5 text-green-500" />
          RECENT WORKOUTS
        </h2>
        <div className="space-y-3">
          {recentWorkouts.map((workout) => (
            <Card 
              key={workout.id}
              className="glass-card border-border/50 cursor-pointer transition-all duration-200 hover:border-primary/30"
              onClick={() => navigate(`/workouts/${workout.id}`)}
            >
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <Badge className={cn("uppercase text-xs", typeColors[workout.type])}>
                    {workout.type}
                  </Badge>
                  <div>
                    <h3 className="font-medium text-foreground text-sm md:text-base">{workout.name}</h3>
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground">
                      <span>{workout.exercises} exercises</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{workout.duration}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>Completed {workout.lastCompleted}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground hidden sm:block" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-4 md:p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold text-primary">24</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Workouts This Month</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4 md:p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold text-accent">18.5</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Hours Trained</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-border/50">
          <CardContent className="p-4 md:p-6 text-center">
            <p className="text-3xl md:text-4xl font-bold text-green-500">96%</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">Completion Rate</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
