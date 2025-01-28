import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <div className="flex items-center gap-2 mb-6">
              <Mail className="h-6 w-6" />
              <h1 className="text-3xl font-bold">Newsletter</h1>
            </div>
            
            <div className="grid gap-6">
              <div className="space-y-4">
                <div>
                  <Input 
                    type="text" 
                    placeholder="Subject" 
                    className="max-w-md"
                  />
                </div>
                
                <div>
                  <Input 
                    type="text" 
                    placeholder="Recipients (e.g., All Members, Board Members)" 
                    className="max-w-md"
                  />
                </div>
                
                <div className="border rounded-lg p-6 bg-white">
                  <Textarea 
                    placeholder="Write your newsletter content here..." 
                    className="min-h-[300px]"
                  />
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Newsletter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Newsletter;