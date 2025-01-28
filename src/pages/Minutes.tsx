import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, ExternalLink, NotebookText } from "lucide-react";
import { Link } from "react-router-dom";
import { AIAssistant } from "@/components/meeting-room/AIAssistant";
import { useToast } from "@/hooks/use-toast";

const Minutes = () => {
  const { toast } = useToast();
  const pastMinutes = [
    { title: "General Assembly Meeting Minutes", date: "2024-02-15" },
    { title: "Board Meeting Minutes", date: "2024-01-30" },
    { title: "Extraordinary Meeting Minutes", date: "2024-01-15" },
    { title: "Annual General Meeting Minutes", date: "2023-12-20" },
    { title: "Committee Meeting Minutes", date: "2023-12-05" },
  ];

  const handleCreateMinutes = () => {
    toast({
      title: "Minutes Created",
      description: "Your meeting minutes have been generated and saved.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Minutes</h1>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Create Minutes with AI</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AIAssistant />
                  
                  <div className="mt-6">
                    <Label htmlFor="minutes-title">Minutes Title</Label>
                    <Input id="minutes-title" className="mt-2" placeholder="Enter title for the minutes..." />
                  </div>
                  
                  <div>
                    <Label htmlFor="minutes-content">Minutes Content</Label>
                    <Textarea 
                      id="minutes-content" 
                      className="mt-2 min-h-[200px]"
                      placeholder="The AI assistant will help generate the content based on the meeting recording..."
                    />
                  </div>
                  
                  <Button 
                    onClick={handleCreateMinutes}
                    className="w-full flex items-center gap-2"
                  >
                    <NotebookText className="h-4 w-4" />
                    Create Minutes
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Past Meeting Minutes
                    <Link 
                      to="/data-storage" 
                      className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                    >
                      View All
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      {pastMinutes.map((minute, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{minute.title}</p>
                              <p className="text-sm text-muted-foreground">{minute.date}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Minutes;