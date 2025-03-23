
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Calendar = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <h1 className="text-3xl font-bold mb-6">Calendar</h1>
            
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    You have no upcoming events scheduled. Click the calendar to add a new event.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Calendar;
