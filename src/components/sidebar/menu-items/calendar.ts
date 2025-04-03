
import { Calendar, List } from "lucide-react";
import { MenuItem } from "./types";

export const calendarMenuItems: MenuItem = {
  icon: Calendar,
  label: "Calendar",
  href: "/calendar",
  subItems: [
    {
      icon: Calendar,
      label: "Appointments",
      href: "/appointments",
    },
    {
      icon: List,
      label: "Tasks",
      href: "/tasks",
    },
  ],
};
