import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MessageCircle, 
  ListChecks, 
  Utensils, 
  Activity,
  X,
  Zap,
  LayoutDashboard,
  Settings,
  Dumbbell
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
        "absolute flex flex-col items-center gap-1 transition-all duration-300 ease-out group z-50",
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
            ? "w-14 h-14 bg-primary text-primary-foreground hover:scale-110"
            : "w-11 h-11 bg-card border border-border text-foreground hover:bg-accent hover:scale-110"
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: "Dashboard", 
      angle: -135, 
      path: "/" 
    },
    { 
      icon: <ListChecks className="h-5 w-5" />, 
      label: "Routines", 
      angle: -180, 
      path: "/routines" 
    },
    { 
      icon: <Utensils className="h-5 w-5" />, 
      label: "Food", 
      angle: -45, 
      path: "/food" 
    },
    { 
      icon: <Dumbbell className="h-5 w-5" />, 
      label: "Workout", 
      angle: 0, 
      path: "/workout" 
    },
    { 
      icon: <Activity className="h-5 w-5" />, 
      label: "Activity", 
      angle: 45, 
      path: "/activity" 
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: "Settings", 
      angle: 90, 
      path: "/settings" 
    },
  ];

  const handleItemClick = (path: string) => {
    if (isDragging) return;
    setIsOpen(false);
    navigate(path);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return;
    setIsDragging(false);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      setIsDragging(true);
      setPosition({
        x: moveEvent.clientX - dragStart.x,
        y: moveEvent.clientY - dragStart.y
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      setTimeout(() => setIsDragging(false), 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isOpen) return;
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    
    const handleTouchMove = (moveEvent: TouchEvent) => {
      setIsDragging(true);
      const moveTouch = moveEvent.touches[0];
      setPosition({
        x: moveTouch.clientX - dragStart.x,
        y: moveTouch.clientY - dragStart.y
      });
    };

    const handleTouchEnd = () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      setTimeout(() => setIsDragging(false), 100);
    };

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
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
      <div 
        className="fixed bottom-24 right-10 md:bottom-8 md:right-12 z-50"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
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
          onClick={() => !isDragging && setIsOpen(!isOpen)}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className={cn(
            "relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 cursor-grab active:cursor-grabbing",
            "bg-primary text-primary-foreground hover:shadow-2xl",
            isDragging && "scale-105"
          )}
        >
          <div
            className={cn(
              "transition-transform duration-300",
              isOpen && "rotate-180"
            )}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Zap className="h-6 w-6" />
            )}
          </div>
          
          {/* Pulse animation when closed */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
          )}
        </button>
      </div>
    </>
  );
};
