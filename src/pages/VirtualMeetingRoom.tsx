import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Video, AlertTriangle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const VirtualMeetingRoom = () => {
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

            <h2 className="text-xl font-semibold mb-4">Easily hold board meetings online!</h2>
            
            <p className="text-muted-foreground mb-6">
              If you cannot meet on site, for example because you live too far away from each other or have limited time, 
              we offer you the possibility to meet online in a virtual meeting in your Coop management software. 
              Your meeting room can be started from this page at any time.
            </p>

            <p className="text-muted-foreground mb-6">
              There is no need to install any additional software, just click the button below and start an online meeting.
            </p>

            <p className="text-muted-foreground mb-6">
              By the way: Participation in the meeting is also possible directly from our app for iOS and Android.
            </p>

            <div className="flex items-center space-x-2 mb-6">
              <Switch id="simulcast" />
              <label htmlFor="simulcast" className="text-sm text-muted-foreground">
                Enable simulcast
              </label>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Enabling simulcast can improve the videoconference for participants with low bandwidth, but greatly reduces video quality.
            </p>

            <div className="flex space-x-4 mb-8">
              <Button>Enter meeting room</Button>
              <Button variant="outline">Enter meeting room (new window)</Button>
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