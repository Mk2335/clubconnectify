import { Building2, ClipboardCheck, Database } from "lucide-react";
import { MenuItem } from "./types";

export const companyMenuItems: MenuItem = {
  icon: Database,
  label: "Unternehmensauswahl",
  href: "/company",
  subItems: [
    {
      icon: Building2,
      label: "Gründung",
      href: "/company/incorporation",
    },
    {
      icon: ClipboardCheck,
      label: "Gesetzliche Prüfung",
      href: "/company/audit",
    },
  ],
};