import {
  Database,
  Home,
  Users,
  Calendar,
  Vote,
  DollarSign,
  List,
  Settings,
  Cable,
  FileText,
  Gavel,
  Mail,
  Building2,
  ClipboardCheck,
  UserPlus,
  Share2,
} from "lucide-react";

export const menuItems = [
  {
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
  },
  { icon: Home, label: "Dashboard", href: "/" },
  { 
    icon: Users, 
    label: "Members", 
    href: "/members",
    subItems: [
      {
        icon: UserPlus,
        label: "New Applications",
        href: "/members/applications",
      },
      {
        icon: Share2,
        label: "Transfer Shares",
        href: "/members/transfer",
      },
    ],
  },
  {
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
  },
  {
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
    ],
  },
  { icon: DollarSign, label: "Financing", href: "/financing" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Cable, label: "Integrations", href: "/integrations" },
];