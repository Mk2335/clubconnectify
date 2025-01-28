import { Building2, ClipboardCheck, Database } from "lucide-react";
import { MenuItem } from "./types";

export const companyMenuItems: MenuItem = {
  icon: Database,
  label: "Company Selection",
  href: "/company",
  subItems: [
    {
      icon: Building2,
      label: "Incorporation",
      href: "/company/incorporation",
    },
    {
      icon: ClipboardCheck,
      label: "Statutory Audit",
      href: "/company/audit",
    },
  ],
};