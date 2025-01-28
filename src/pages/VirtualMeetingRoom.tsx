import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { AIAssistant } from "@/components/meeting-room/AIAssistant";
import { MeetingControls } from "@/components/meeting-room/MeetingControls";
import { FAQ } from "@/components/meeting-room/FAQ";

const VirtualMeetingRoom = () => {
  const [simulcastEnabled, setSimulcastEnabled] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Virtual Meeting Room</h1>
            </div>

            <div className="grid gap-6 mb-6">
              <AIAssistant />
              <MeetingControls 
                simulcastEnabled={simulcastEnabled}
                setSimulcastEnabled={setSimulcastEnabled}
              />
            </div>

            <Alert variant="destructive" className="mb-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                We use local instances of the Jitsi video platform to provide the feature. No meetings are recorded or shared. 
                If you are having difficulty connecting or embedding video and audio devices, use the Google Chrome browser - 
                it currently supports WebRTC technology best. When starting the meeting room, access to the microphone / camera 
                must be allowed in the browser if they are to be used. This can be changed afterwards.
              </AlertDescription>
            </Alert>

            <FAQ />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VirtualMeetingRoom;