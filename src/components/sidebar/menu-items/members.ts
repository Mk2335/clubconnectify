
import { Users, Book, Mail, CreditCard, Wand2 } from "lucide-react";
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
    }
  ],
};
