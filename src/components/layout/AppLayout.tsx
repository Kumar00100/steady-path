import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ListChecks, 
  MessageCircle, 
  Utensils, 
  Activity,
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      <span className="font-medium">{label}</span>
      {isActive && (
        <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
      )}
    </NavLink>
  );
};

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 p-4">
        <div className="mb-8 px-4">
          <h1 className="text-xl font-semibold text-foreground">Discipline</h1>
          <p className="text-sm text-muted-foreground">Track. Monitor. Grow.</p>
        </div>

        <nav className="flex-1 space-y-1">
          <NavItem to="/" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
          <NavItem to="/routines" icon={<ListChecks className="h-5 w-5" />} label="Routines" />
          <NavItem to="/coach" icon={<MessageCircle className="h-5 w-5" />} label="AI Coach" />
          <NavItem to="/food" icon={<Utensils className="h-5 w-5" />} label="Food Log" />
          <NavItem to="/activity" icon={<Activity className="h-5 w-5" />} label="Activity" />
        </nav>

        <div className="pt-4 border-t border-border">
          <NavItem to="/settings" icon={<Settings className="h-5 w-5" />} label="Settings" />
        </div>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
        <div className="flex justify-around py-2">
          {[
            { to: "/", icon: <LayoutDashboard className="h-5 w-5" />, label: "Home" },
            { to: "/routines", icon: <ListChecks className="h-5 w-5" />, label: "Routines" },
            { to: "/coach", icon: <MessageCircle className="h-5 w-5" />, label: "Coach" },
            { to: "/food", icon: <Utensils className="h-5 w-5" />, label: "Food" },
            { to: "/activity", icon: <Activity className="h-5 w-5" />, label: "Activity" },
          ].map((item) => (
            <MobileNavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="container max-w-5xl py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

const MobileNavItem = ({ to, icon, label }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <NavLink
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </NavLink>
  );
};
