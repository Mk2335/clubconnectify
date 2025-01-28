import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Mail, Send, Calendar as CalendarIcon, Users, Eye, Template, Clock } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const Newsletter = () => {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    toast({
      title: scheduleEnabled ? "Newsletter Scheduled" : "Newsletter Sent",
      description: scheduleEnabled 
        ? `Your newsletter will be sent on ${format(selectedDate || new Date(), "PPP")}` 
        : "Your newsletter has been sent successfully.",
    });
  };

  const templates = [
    { id: "monthly", name: "Monthly Update" },
    { id: "event", name: "Event Announcement" },
    { id: "meeting", name: "Meeting Minutes" },
    { id: "custom", name: "Custom Template" },
  ];

  const recipientGroups = [
    { id: "all", name: "All Members" },
    { id: "board", name: "Board Members" },
    { id: "committee", name: "Committee Members" },
    { id: "active", name: "Active Members" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4 md:hidden" />
            <div className="flex items-center gap-2 mb-6">
              <Mail className="h-6 w-6" />
              <h1 className="text-3xl font-bold">Newsletter</h1>
            </div>
            
            <div className="grid gap-6">
              <Card>
                <CardContent className="p-6">
                  <Tabs defaultValue="compose" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="compose">Compose</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>

                    <TabsContent value="compose" className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="template">Template</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                              <SelectContent>
                                {templates.map((template) => (
                                  <SelectItem key={template.id} value={template.id}>
                                    {template.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Input 
                              id="subject"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              placeholder="Newsletter subject..."
                            />
                          </div>

                          <div>
                            <Label htmlFor="recipients">Recipients</Label>
                            <Select>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select recipient group" />
                              </SelectTrigger>
                              <SelectContent>
                                {recipientGroups.map((group) => (
                                  <SelectItem key={group.id} value={group.id}>
                                    {group.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="schedule"
                              checked={scheduleEnabled}
                              onCheckedChange={setScheduleEnabled}
                            />
                            <Label htmlFor="schedule">Schedule for later</Label>
                          </div>

                          {scheduleEnabled && (
                            <div>
                              <Label>Schedule Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !selectedDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={setSelectedDate}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          )}
                        </div>

                        <div className="space-y-4">
                          <Label htmlFor="content">Content</Label>
                          <Textarea 
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your newsletter content here..."
                            className="min-h-[300px]"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="preview" className="space-y-4">
                      <Card className="p-6">
                        <div className="space-y-4">
                          <div className="border-b pb-2">
                            <h2 className="text-xl font-semibold">{subject || "Newsletter Subject"}</h2>
                          </div>
                          <div className="prose max-w-none">
                            {content || "Newsletter content will appear here..."}
                          </div>
                        </div>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end mt-6 gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Template className="h-4 w-4" />
                      Save as Template
                    </Button>
                    <Button onClick={handleSend} className="flex items-center gap-2">
                      {scheduleEnabled ? <Clock className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                      {scheduleEnabled ? "Schedule" : "Send"} Newsletter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Newsletter;