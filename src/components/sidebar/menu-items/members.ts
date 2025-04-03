
import { Users, Book } from "lucide-react";
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
  ],
};
