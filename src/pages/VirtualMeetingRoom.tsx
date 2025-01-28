import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Video, AlertTriangle, Mic, FileText, ListTodo } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const VirtualMeetingRoom = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [simulcastEnabled, setSimulcastEnabled] = useState(false);
  const { toast } = useToast();

  const handleStartRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording stopped" : "Recording started",
      description: isRecording 
        ? "The transcript will be generated shortly." 
        : "Your meeting is being recorded for transcript generation.",
    });
  };

  const generateAgendaGuidance = () => {
    toast({
      title: "AI Agenda Assistant",
      description: "Analyzing your meeting context and generating structured agenda suggestions...",
    });
    // In a real implementation, this would connect to an AI service
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Your virtual meeting room</h1>
              <Video className="h-12 w-12 text-primary" />
            </div>

            <div className="grid gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Meeting Assistant</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Button 
                      onClick={handleStartRecording}
                      variant={isRecording ? "destructive" : "default"}
                      className="flex items-center gap-2"
                    >
                      <Mic className="h-4 w-4" />
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>
                    <Button 
                      onClick={generateAgendaGuidance}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <ListTodo className="h-4 w-4" />
                      Generate Agenda Suggestions
                    </Button>
                  </div>
                  {isRecording && (
                    <Alert>
                      <FileText className="h-4 w-4" />
                      <AlertDescription>
                        Recording in progress. The AI will automatically generate a transcript when you stop recording.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meeting Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="simulcast" 
                      checked={simulcastEnabled}
                      onCheckedChange={setSimulcastEnabled}
                    />
                    <label htmlFor="simulcast" className="text-sm text-muted-foreground">
                      Enable simulcast
                    </label>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Enabling simulcast can improve the videoconference for participants with low bandwidth, but greatly reduces video quality.
                  </p>

                  <div className="flex space-x-4">
                    <Button>Enter meeting room</Button>
                    <Button variant="outline">Enter meeting room (new window)</Button>
                  </div>
                </CardContent>
              </Card>
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

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Frequently asked questions and answers:</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>The page does not load / crashes or does not respond.</AccordionTrigger>
                  <AccordionContent>
                    Please try refreshing the page or using a different browser.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>My microphone / camera cannot be activated.</AccordionTrigger>
                  <AccordionContent>
                    Check your browser permissions and make sure your devices are properly connected.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Picture or sound are jerky or have short dropouts.</AccordionTrigger>
                  <AccordionContent>
                    This might be due to network issues. Try enabling simulcast or checking your internet connection.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>The connection is very poor and breaks down frequently.</AccordionTrigger>
                  <AccordionContent>
                    Check your internet connection stability and try reducing video quality or disabling video.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>The screen sharing cannot be started.</AccordionTrigger>
                  <AccordionContent>
                    Make sure you're using a supported browser like Google Chrome and have granted the necessary permissions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default VirtualMeetingRoom;