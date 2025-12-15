import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageCircle, 
  ListChecks, 
  Utensils, 
  Activity,
  X,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  angle: number;
  distance: number;
  isOpen: boolean;
  delay: number;
  onClick: () => void;
  isPrimary?: boolean;
}

const MenuItem = ({ 
  icon, 
  label, 
  angle, 
  distance, 
  isOpen, 
  delay, 
  onClick,
  isPrimary 
}: MenuItemProps) => {
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute flex flex-col items-center gap-1 transition-all duration-300 ease-out group",
        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0 pointer-events-none"
      )}
      style={{
        transform: isOpen 
          ? `translate(${x}px, ${y}px)` 
          : "translate(0, 0)",
        transitionDelay: isOpen ? `${delay}ms` : "0ms",
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full shadow-lg transition-all duration-200",
          isPrimary
            ? "w-16 h-16 bg-primary text-primary-foreground hover:scale-110"
            : "w-12 h-12 bg-card border border-border text-foreground hover:bg-accent hover:scale-110"
        )}
      >
        {icon}
      </div>
      <span
        className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap transition-all",
          isPrimary
            ? "bg-primary text-primary-foreground"
            : "bg-card/90 backdrop-blur-sm text-foreground border border-border"
        )}
      >
        {label}
      </span>
    </button>
  );
};

export const FloatingDisciplineButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { 
      icon: <MessageCircle className="h-6 w-6" />, 
      label: "AI Coach", 
      angle: -90, 
      path: "/coach",
      isPrimary: true 
    },
    { 
      icon: <ListChecks className="h-5 w-5" />, 
      label: "Routines", 
      angle: -145, 
      path: "/routines" 
    },
    { 
      icon: <Utensils className="h-5 w-5" />, 
      label: "Food", 
      angle: -35, 
      path: "/food" 
    },
    { 
      icon: <Activity className="h-5 w-5" />, 
      label: "Activity", 
      angle: 0, 
      path: "/activity" 
    },
  ];

  const handleItemClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-foreground/10 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Floating Menu Container */}
      <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50">
        {/* Menu Items */}
        <div className="relative">
          {menuItems.map((item, index) => (
            <MenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              angle={item.angle}
              distance={item.isPrimary ? 100 : 90}
              isOpen={isOpen}
              delay={index * 50}
              onClick={() => handleItemClick(item.path)}
              isPrimary={item.isPrimary}
            />
          ))}
        </div>

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative flex items-center gap-2 px-5 py-3 rounded-full shadow-xl transition-all duration-300",
            "bg-primary text-primary-foreground hover:shadow-2xl",
            isOpen && "rotate-0"
          )}
        >
          <div
            className={cn(
              "transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Zap className="h-5 w-5" />
            )}
          </div>
          <span className="font-semibold text-sm">Discipline</span>
          
          {/* Pulse animation when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
          )}
        </button>
      </div>
    </>
  );
};
