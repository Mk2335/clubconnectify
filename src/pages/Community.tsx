import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, MessageCircle, Bot, Phone } from "lucide-react";

const Community = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-2xl font-bold mb-6">Community</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Live Call Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Live Call
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Join Live Call
                  </Button>
                </CardContent>
              </Card>

              {/* Live Call Recording Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Live Call Recording
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Access previous call recordings</p>
                    <Button variant="outline" className="w-full">
                      View Recordings
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Chat Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Community Chat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Open Chat
                  </Button>
                </CardContent>
              </Card>

              {/* ChatBot Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    ChatBot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    Start ChatBot
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Community;