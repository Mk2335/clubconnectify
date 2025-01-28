import { Calendar, List } from "lucide-react";
import { MenuItem } from "./types";

export const calendarMenuItems: MenuItem = {
  icon: Calendar,
  label: "Calendar",
  href: "/calendar",
  subItems: [
    {
      icon: List,
      label: "Tasks",
      href: "/calendar/tasks",
    },
  ],
};