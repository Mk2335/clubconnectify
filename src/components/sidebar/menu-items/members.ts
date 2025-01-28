import { Share2, UserPlus, Users, Book } from "lucide-react";
import { MenuItem } from "./types";

export const membersMenuItems: MenuItem = {
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
    {
      icon: Book,
      label: "Address Book",
      href: "/members/address-book",
    },
  ],
};