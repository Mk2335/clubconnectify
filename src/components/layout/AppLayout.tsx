
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  title?: string; // Added title as an optional prop
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 p-6 md:p-8">
          {title && (
            <h1 className="mb-6 text-2xl font-semibold tracking-tight">{title}</h1>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}
