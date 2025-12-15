import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Shield,
  Download,
  Trash2,
  Moon,
  Smartphone,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your preferences and privacy
        </p>
      </div>

      {/* Profile Section */}
      <section className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <User className="h-8 w-8 text-accent-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Profile</h2>
            <p className="text-sm text-muted-foreground">
              Manage your account settings
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Display Name</p>
              <p className="text-sm text-muted-foreground">User</p>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border">
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p className="text-sm text-muted-foreground">user@example.com</p>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
        </div>
      </section>

      {/* Preferences */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Preferences
        </h2>

        <div className="space-y-4">
          <SettingRow
            icon={Bell}
            title="Notifications"
            description="Receive reminders for routines"
            hasToggle
            defaultChecked
          />
          <SettingRow
            icon={Moon}
            title="Dark Mode"
            description="Use dark theme"
            hasToggle
          />
          <SettingRow
            icon={Smartphone}
            title="Offline Mode"
            description="App works without internet"
            hasToggle
            defaultChecked
          />
        </div>
      </section>

      {/* Privacy & Data */}
      <section className="glass-card rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-foreground mb-6">
          Privacy & Data
        </h2>

        <div className="space-y-4">
          <SettingRow
            icon={Shield}
            title="Data Privacy"
            description="Your data is stored locally on your device"
          />
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Download className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Export Data</p>
                <p className="text-sm text-muted-foreground">
                  Download all your data
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="font-medium text-foreground">Delete All Data</p>
                <p className="text-sm text-muted-foreground">
                  Permanently remove all your data
                </p>
              </div>
            </div>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </div>
      </section>

      {/* App Info */}
      <section className="text-center text-sm text-muted-foreground">
        <p>Discipline v1.0.0</p>
        <p className="mt-1">Built for focus, not gamification.</p>
      </section>
    </div>
  );
};

interface SettingRowProps {
  icon: React.ElementType;
  title: string;
  description: string;
  hasToggle?: boolean;
  defaultChecked?: boolean;
}

const SettingRow = ({
  icon: Icon,
  title,
  description,
  hasToggle,
  defaultChecked,
}: SettingRowProps) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent-foreground" />
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {hasToggle && (
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            defaultChecked={defaultChecked}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary transition-colors peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
        </label>
      )}
    </div>
  );
};

export default Settings;
