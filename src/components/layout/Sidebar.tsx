import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Dumbbell, 
  BookOpen, 
  BarChart3,
  Settings,
  Flame
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/coach", icon: MessageSquare, label: "AI Coach" },
  { to: "/workouts", icon: Dumbbell, label: "Workouts" },
  { to: "/exercises", icon: BookOpen, label: "Exercises" },
  { to: "/progress", icon: BarChart3, label: "Progress" },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg titan-gradient flex items-center justify-center titan-glow">
            <Flame className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl tracking-wider text-foreground">TITAN X</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Gym AI</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "hover:bg-secondary/50",
                isActive && "bg-primary/10 text-primary border-l-2 border-primary"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                isActive ? "text-primary" : "text-muted-foreground"
              )} />
              <span className={cn(
                "font-medium",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <NavLink
          to="/settings"
          onClick={handleClick}
          className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-secondary/50 text-muted-foreground"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
}
