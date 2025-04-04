
import { Users, Book, Mail, CreditCard, Wand2, UserPlus, Vote, Share2, UserSearch, BarChart3 } from "lucide-react";
import { MenuItem } from "./types";

export const membersMenuItems: MenuItem = {
  icon: Users,
  label: "Members",
  href: "/members",
  subItems: [
    {
      icon: Book,
      label: "Address Book",
      href: "/address-book",
    },
    {
      icon: Mail,
      label: "Communication",
      href: "/members/communication",
    },
    {
      icon: CreditCard,
      label: "Finances",
      href: "/members/finances",
    },
    {
      icon: Wand2,
      label: "AI Automation",
      href: "/members/ai-automation",
    },
    {
      icon: UserPlus,
      label: "Applications",
      href: "/members/applications",
    },
    {
      icon: Vote,
      label: "Voting",
      href: "/members/voting",
    },
    {
      icon: Share2,
      label: "Resources",
      href: "/members/resources",
    },
    {
      icon: UserSearch,
      label: "Directory",
      href: "/members/directory",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/members/analytics",
    }
  ],
};
