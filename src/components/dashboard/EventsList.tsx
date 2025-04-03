
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Plus, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Event {
  date: string;
  title: string;
  type: string;
}

interface EventsListProps {
  events: Event[];
  isLoading?: boolean;
}

const EventsList = ({ events, isLoading = false }: EventsListProps) => {
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);
  const { toast } = useToast();

  const handleAddToCalendar = (event: Event) => {
    toast({
      title: "Added to calendar",
      description: `"${event.title}" has been added to your calendar.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            {events.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No upcoming events</p>
            ) : (
              events.map((event, i) => (
                <div
                  key={i}
                  className="mb-4 rounded-lg border p-3 hover:bg-accent transition-colors cursor-pointer"
                  onClick={() => setExpandedEvent(expandedEvent === i ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{event.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.type === "Meeting" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-purple-100 text-purple-800"
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.date)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className={`h-4 w-4 transition-transform ${expandedEvent === i ? 'rotate-90' : ''}`} />
                    </Button>
                  </div>
                  
                  {expandedEvent === i && (
                    <div className="mt-2 pt-2 border-t">
                      <p className="text-sm mb-2">
                        {event.type === "Meeting" 
                          ? "Regular scheduled meeting for all team members." 
                          : "Special event for the organization."}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full mt-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCalendar(event);
                        }}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Add to Calendar
                      </Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="link" size="sm">
          View All Events
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventsList;
