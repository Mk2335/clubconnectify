import { Calendar, List } from "lucide-react";
import { MenuItem } from "./types";
import { appointmentMenuItems } from "./appointments";

export const calendarMenuItems: MenuItem = {
  icon: Calendar,
  label: "Calendar",
  href: "/calendar",
  subItems: [
    appointmentMenuItems,
    {
      icon: List,
      label: "Tasks",
      href: "/calendar/tasks",
    },
  ],
};