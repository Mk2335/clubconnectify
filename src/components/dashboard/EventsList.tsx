import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "lucide-react";

interface Event {
  date: string;
  title: string;
  type: string;
}

interface EventsListProps {
  events: Event[];
}

const EventsList = ({ events }: EventsListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {events.map((event, i) => (
            <div
              key={i}
              className="mb-4 rounded-lg border p-3 hover:bg-accent"
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{event.title}</p>
                <span className="text-xs text-muted-foreground">
                  {event.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {event.date}
              </p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EventsList;