
import { MenuItem } from "./types";
import { membersMenuItems } from "./members";
import { calendarMenuItems } from "./calendar";
import { settingsMenuItem } from "./settings";
import { Home } from "lucide-react";

export const menuItems: MenuItem[] = [
  { icon: Home, label: "Dashboard", href: "/" },
  membersMenuItems,
  calendarMenuItems,
  settingsMenuItem,
];
