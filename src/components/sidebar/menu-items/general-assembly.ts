import { FileText, Gavel, Mail, Vote, Database, Video } from "lucide-react";
import { MenuItem } from "./types";

export const generalAssemblyMenuItems: MenuItem = {
  icon: Gavel,
  label: "General Assembly",
  href: "/general-assembly",
  subItems: [
    {
      icon: Vote,
      label: "Voting",
      href: "/general-assembly/voting",
    },
    {
      icon: FileText,
      label: "Minutes",
      href: "/general-assembly/minutes",
    },
    {
      icon: Mail,
      label: "Newsletter",
      href: "/general-assembly/newsletter",
    },
    {
      icon: Database,
      label: "Data Storage",
      href: "/general-assembly/storage",
    },
    {
      icon: Video,
      label: "Virtual Meeting Room",
      href: "/general-assembly/virtual-meeting",
    },
  ],
};