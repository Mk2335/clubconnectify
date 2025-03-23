
import React from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/utils/translations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const Calendar = () => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <AppLayout title="Calendar">
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
    </AppLayout>
  );
};

export default Calendar;
