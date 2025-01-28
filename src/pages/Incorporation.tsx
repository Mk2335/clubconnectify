import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import IncorporationForm from "@/components/incorporation/IncorporationForm";

const Incorporation = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Incorporation</h1>
            <IncorporationForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Incorporation;