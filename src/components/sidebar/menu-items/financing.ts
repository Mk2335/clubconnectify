import { DollarSign, LineChart, FileText, Wallet } from "lucide-react";
import { MenuItem } from "./types";

export const financingMenuItems: MenuItem = {
  icon: DollarSign,
  label: "Financing",
  href: "/financing",
  subItems: [
    {
      icon: Wallet,
      label: "Account",
      href: "/financing/account",
    },
    {
      icon: LineChart,
      label: "Business Plan",
      href: "/financing/business-plan",
    },
    {
      icon: FileText,
      label: "Invoice",
      href: "/financing/invoice",
    },
  ],
};