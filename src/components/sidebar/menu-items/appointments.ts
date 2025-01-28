import { Calendar, CalendarCheck, CalendarPlus } from "lucide-react";
import { MenuItem } from "./types";

export const appointmentMenuItems: MenuItem = {
  icon: Calendar,
  label: "Appointments",
  href: "/calendar/appointments",
  subItems: [
    {
      icon: CalendarCheck,
      label: "Association Calendar",
      href: "/calendar/appointments/association",
    },
    {
      icon: CalendarPlus,
      label: "Meetings & Protocols",
      href: "/calendar/appointments/meetings",
    },
  ],
};