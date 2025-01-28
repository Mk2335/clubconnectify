import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload } from "lucide-react";

const Minutes = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Minutes</h1>
            
            <div className="grid gap-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Template
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Create New
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input 
                    type="text" 
                    placeholder="Title / Subject" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="border rounded-lg p-6 bg-white">
                  <div className="prose max-w-none">
                    <div className="flex justify-between mb-4">
                      <div>Meeting Minutes</div>
                      <div>30.08.2024</div>
                    </div>
                    <p>Hello together,</p>
                    {/* Editor content will go here */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Minutes;