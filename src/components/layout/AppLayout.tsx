import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main content - full width, no sidebar */}
      <main className="min-h-screen pb-20 md:pb-8">
        <div className="container max-w-2xl py-6 md:py-8 px-4">
          {children}
        </div>
      </main>
    </div>
  );
};
