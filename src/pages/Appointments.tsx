
import { AppLayout } from "@/components/layout/AppLayout";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const AppointmentsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <AppLayout title="Appointments">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border w-full"
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default AppointmentsPage;
