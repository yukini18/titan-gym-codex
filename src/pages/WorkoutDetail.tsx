import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Play, Clock, Dumbbell, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  weight: string;
}

interface WorkoutData {
  id: string;
  name: string;
  type: "push" | "pull" | "legs" | "upper" | "lower" | "full";
  duration: string;
  lastCompleted?: string;
  scheduled?: string;
  exercises: Exercise[];
}

// Mock data - in a real app this would come from a database
const workoutData: Record<string, WorkoutData> = {
  "1": {
    id: "1",
    name: "Push Day - Chest & Shoulders",
    type: "push",
    duration: "60 min",
    scheduled: "Today",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10", weight: "80 kg" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", weight: "30 kg" },
      { name: "Overhead Press", sets: 4, reps: "8-10", weight: "50 kg" },
      { name: "Lateral Raises", sets: 3, reps: "12-15", weight: "12 kg" },
      { name: "Tricep Pushdowns", sets: 3, reps: "12-15", weight: "25 kg" },
      { name: "Chest Flyes", sets: 3, reps: "12-15", weight: "15 kg" },
    ]
  },
  "2": {
    id: "2",
    name: "Pull Day - Back & Biceps",
    type: "pull",
    duration: "55 min",
    scheduled: "Tomorrow",
    exercises: [
      { name: "Deadlift", sets: 4, reps: "5-6", weight: "120 kg" },
      { name: "Barbell Rows", sets: 4, reps: "8-10", weight: "70 kg" },
      { name: "Lat Pulldowns", sets: 3, reps: "10-12", weight: "60 kg" },
      { name: "Face Pulls", sets: 3, reps: "15-20", weight: "20 kg" },
      { name: "Bicep Curls", sets: 3, reps: "10-12", weight: "15 kg" },
      { name: "Hammer Curls", sets: 3, reps: "10-12", weight: "14 kg" },
    ]
  },
  "3": {
    id: "3",
    name: "Leg Day - Quads & Glutes",
    type: "legs",
    duration: "65 min",
    scheduled: "Thursday",
    exercises: [
      { name: "Squats", sets: 4, reps: "6-8", weight: "100 kg" },
      { name: "Romanian Deadlift", sets: 4, reps: "8-10", weight: "80 kg" },
      { name: "Leg Press", sets: 3, reps: "10-12", weight: "150 kg" },
      { name: "Walking Lunges", sets: 3, reps: "12 each", weight: "20 kg" },
      { name: "Leg Curls", sets: 3, reps: "12-15", weight: "40 kg" },
    ]
  },
  "4": {
    id: "4",
    name: "Upper Body Hypertrophy",
    type: "upper",
    duration: "70 min",
    lastCompleted: "3 days ago",
    exercises: [
      { name: "Incline Bench Press", sets: 4, reps: "8-10", weight: "70 kg" },
      { name: "Cable Rows", sets: 4, reps: "10-12", weight: "55 kg" },
      { name: "Dumbbell Shoulder Press", sets: 3, reps: "10-12", weight: "24 kg" },
      { name: "Pull-ups", sets: 3, reps: "8-10", weight: "BW" },
      { name: "Dips", sets: 3, reps: "10-12", weight: "BW" },
      { name: "Bicep Curls", sets: 3, reps: "12-15", weight: "12 kg" },
      { name: "Tricep Extensions", sets: 3, reps: "12-15", weight: "18 kg" },
      { name: "Lateral Raises", sets: 3, reps: "15-20", weight: "10 kg" },
    ]
  },
  "5": {
    id: "5",
    name: "Lower Body Strength",
    type: "lower",
    duration: "60 min",
    lastCompleted: "5 days ago",
    exercises: [
      { name: "Back Squats", sets: 5, reps: "5", weight: "110 kg" },
      { name: "Front Squats", sets: 3, reps: "6-8", weight: "80 kg" },
      { name: "Hip Thrusts", sets: 4, reps: "8-10", weight: "90 kg" },
      { name: "Bulgarian Split Squats", sets: 3, reps: "10 each", weight: "20 kg" },
      { name: "Calf Raises", sets: 4, reps: "15-20", weight: "60 kg" },
    ]
  },
};

const typeColors: Record<string, string> = {
  push: "bg-red-500/20 text-red-400 border-red-500/30",
  pull: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  legs: "bg-green-500/20 text-green-400 border-green-500/30",
  upper: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  lower: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  full: "bg-primary/20 text-primary border-primary/30",
};

export default function WorkoutDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const workout = id ? workoutData[id] : null;

  if (!workout) {
    return (
      <div className="p-4 md:p-8 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-xl font-semibold text-foreground mb-2">Workout not found</h2>
        <p className="text-muted-foreground mb-4">The workout you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/workouts")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Workouts
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/workouts")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <Badge className={cn("uppercase text-xs", typeColors[workout.type])}>
              {workout.type}
            </Badge>
            {workout.scheduled && (
              <span className="text-xs font-semibold text-primary uppercase">
                {workout.scheduled}
              </span>
            )}
            {workout.lastCompleted && (
              <span className="text-xs text-muted-foreground">
                Last: {workout.lastCompleted}
              </span>
            )}
          </div>
          <h1 className="font-display text-xl md:text-3xl tracking-wide text-foreground">
            {workout.name}
          </h1>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Dumbbell className="w-4 h-4" />
          <span>{workout.exercises.length} exercises</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{workout.duration}</span>
        </div>
      </div>

      {/* Start Workout Button */}
      <Button className="w-full sm:w-auto titan-gradient titan-glow text-primary-foreground font-semibold px-8 py-6 text-lg">
        <Play className="w-5 h-5 mr-2" />
        Start Workout
      </Button>

      {/* Exercises List */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Dumbbell className="w-5 h-5 text-primary" />
            Exercises
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {workout.exercises.map((exercise, index) => (
            <div 
              key={index}
              className="p-4 bg-secondary/20 rounded-lg border border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="font-medium text-foreground">{exercise.name}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground ml-12 sm:ml-0">
                <span>{exercise.sets} sets</span>
                <span className="text-border">•</span>
                <span>{exercise.reps} reps</span>
                <span className="text-border">•</span>
                <span className="text-primary font-medium">{exercise.weight}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Edit className="w-4 h-4 mr-2" />
          Edit Workout
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none text-destructive hover:text-destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete Workout
        </Button>
      </div>
    </div>
  );
}
