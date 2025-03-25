import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const AppLayout = ({ children, title, className = "" }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className={`max-w-6xl mx-auto ${className}`}>
            <SidebarTrigger className="mb-4" />
            {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};