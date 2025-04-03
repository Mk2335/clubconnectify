
import { Users, Book, Mail, CreditCard } from "lucide-react";
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
    }
  ],
};
