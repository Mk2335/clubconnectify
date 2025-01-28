import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

const Minutes = () => {
  const pastMinutes = [
    { title: "General Assembly Meeting Minutes", date: "2024-02-15" },
    { title: "Board Meeting Minutes", date: "2024-01-30" },
    { title: "Extraordinary Meeting Minutes", date: "2024-01-15" },
    { title: "Annual General Meeting Minutes", date: "2023-12-20" },
    { title: "Committee Meeting Minutes", date: "2023-12-05" },
  ];

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
                  <CardTitle>Create New Minutes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Create New
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Past Meeting Minutes
                    <Link 
                      to="/general-assembly/storage" 
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