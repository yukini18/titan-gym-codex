import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

const workoutTypes = [
  { value: "push", label: "Push" },
  { value: "pull", label: "Pull" },
  { value: "legs", label: "Legs" },
  { value: "upper", label: "Upper Body" },
  { value: "lower", label: "Lower Body" },
  { value: "full", label: "Full Body" },
];

export default function NewWorkout() {
  const navigate = useNavigate();
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: "1", name: "", sets: "3", reps: "10", weight: "" }
  ]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      { id: Date.now().toString(), name: "", sets: "3", reps: "10", weight: "" }
    ]);
  };

  const removeExercise = (id: string) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter(ex => ex.id !== id));
    }
  };

  const updateExercise = (id: string, field: keyof Exercise, value: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const handleSave = () => {
    if (!workoutName.trim()) {
      toast({
        title: "Missing workout name",
        description: "Please enter a name for your workout",
        variant: "destructive"
      });
      return;
    }

    if (!workoutType) {
      toast({
        title: "Missing workout type",
        description: "Please select a workout type",
        variant: "destructive"
      });
      return;
    }

    const validExercises = exercises.filter(ex => ex.name.trim());
    if (validExercises.length === 0) {
      toast({
        title: "No exercises added",
        description: "Please add at least one exercise",
        variant: "destructive"
      });
      return;
    }

    // Save workout (in a real app, this would save to a database)
    toast({
      title: "Workout created!",
      description: `${workoutName} has been saved with ${validExercises.length} exercises`,
    });
    navigate("/workouts");
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/workouts")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-display text-2xl md:text-4xl tracking-wide text-foreground">
            NEW <span className="text-primary titan-text-glow">WORKOUT</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Create your custom workout routine</p>
        </div>
      </div>

      {/* Workout Details */}
      <Card className="glass-card border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Workout Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workout Name</Label>
              <Input
                id="name"
                placeholder="e.g., Push Day - Chest & Shoulders"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                className="bg-secondary/30 border-border"
              />
            </div>
            <div className="space-y-2">
              <Label>Workout Type</Label>
              <Select value={workoutType} onValueChange={setWorkoutType}>
                <SelectTrigger className="bg-secondary/30 border-border">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {workoutTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercises */}
      <Card className="glass-card border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Exercises</CardTitle>
          <Button variant="outline" size="sm" onClick={addExercise}>
            <Plus className="w-4 h-4 mr-2" />
            Add Exercise
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {exercises.map((exercise, index) => (
            <div 
              key={exercise.id} 
              className="p-4 bg-secondary/20 rounded-lg border border-border/30 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Exercise {index + 1}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeExercise(exercise.id)}
                  disabled={exercises.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2 space-y-1">
                  <Label className="text-xs">Exercise Name</Label>
                  <Input
                    placeholder="e.g., Bench Press"
                    value={exercise.name}
                    onChange={(e) => updateExercise(exercise.id, "name", e.target.value)}
                    className="bg-background/50 border-border/50"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 md:col-span-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Sets</Label>
                    <Input
                      type="number"
                      placeholder="3"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(exercise.id, "sets", e.target.value)}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Reps</Label>
                    <Input
                      type="number"
                      placeholder="10"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(exercise.id, "reps", e.target.value)}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Weight</Label>
                    <Input
                      placeholder="kg"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(exercise.id, "weight", e.target.value)}
                      className="bg-background/50 border-border/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end">
        <Button variant="outline" onClick={() => navigate("/workouts")}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="titan-gradient titan-glow text-primary-foreground">
          <Save className="w-4 h-4 mr-2" />
          Save Workout
        </Button>
      </div>
    </div>
  );
}
