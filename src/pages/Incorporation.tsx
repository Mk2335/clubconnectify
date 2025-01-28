import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IncorporationForm from "@/components/incorporation/IncorporationForm";
import StatutesForm from "@/components/incorporation/StatutesForm";

const Incorporation = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Gründung</h1>
            
            <Tabs defaultValue="incorporation" className="w-full">
              <TabsList className="w-full mb-8 grid grid-cols-2 bg-muted p-1 rounded-lg">
                <TabsTrigger 
                  value="incorporation" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                >
                  Incorporation
                </TabsTrigger>
                <TabsTrigger 
                  value="statutes" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                >
                  Satzung
                </TabsTrigger>
              </TabsList>

              <TabsContent value="incorporation">
                <IncorporationForm />
              </TabsContent>

              <TabsContent value="statutes">
                <StatutesForm />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Incorporation;