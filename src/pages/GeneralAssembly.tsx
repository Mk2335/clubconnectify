import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AssemblyForm } from "@/components/AssemblyForm";

const GeneralAssembly = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">General Assembly</h1>
            <AssemblyForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default GeneralAssembly;