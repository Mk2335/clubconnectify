import { DollarSign, LineChart } from "lucide-react";
import { MenuItem } from "./types";

export const financingMenuItems: MenuItem = {
  icon: DollarSign,
  label: "Financing",
  href: "/financing",
  subItems: [
    {
      icon: LineChart,
      label: "Business Plan",
      href: "/financing/business-plan",
    },
  ],
};