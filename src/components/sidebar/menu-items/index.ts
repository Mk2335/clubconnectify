import { MenuItem } from "./types";
import { companyMenuItems } from "./company";
import { membersMenuItems } from "./members";
import { calendarMenuItems } from "./calendar";
import { generalAssemblyMenuItems } from "./general-assembly";
import { financingMenuItems } from "./financing";
import { settingsMenuItem } from "./settings";
import { integrationsMenuItem } from "./integrations";
import { Home } from "lucide-react";

export const menuItems: MenuItem[] = [
  companyMenuItems,
  { icon: Home, label: "Dashboard", href: "/" },
  membersMenuItems,
  calendarMenuItems,
  generalAssemblyMenuItems,
  financingMenuItems,
  settingsMenuItem,
  integrationsMenuItem,
];