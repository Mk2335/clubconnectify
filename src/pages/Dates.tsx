import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Calendar } from "@/components/ui/calendar";
import EventsList from "@/components/dashboard/EventsList";
import TasksList from "@/components/dashboard/TasksList";
import { useState } from "react";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Sample data for events and tasks
  const events = [
    {
      date: "2024-04-20",
      title: "Board Meeting",
      type: "Meeting"
    },
    {
      date: "2024-04-22",
      title: "Q2 Review",
      type: "Meeting"
    },
    {
      date: "2024-04-25",
      title: "Team Building",
      type: "Event"
    }
  ];

  const tasks = [
    {
      title: "Review Q1 Reports",
      status: "In Progress" as const,
      dueDate: "2024-04-21"
    },
    {
      title: "Prepare Meeting Minutes",
      status: "Pending" as const,
      dueDate: "2024-04-23"
    },
    {
      title: "Update Shareholder Registry",
      status: "Completed" as const,
      dueDate: "2024-04-19"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Calendar</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calendar Overview */}
              <div className="col-span-1 md:col-span-2">
                <div className="bg-white rounded-lg shadow p-6">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                  />
                </div>
              </div>

              {/* Events List */}
              <div className="col-span-1">
                <EventsList events={events} />
              </div>

              {/* Tasks List */}
              <div className="col-span-1">
                <TasksList tasks={tasks} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CalendarPage;