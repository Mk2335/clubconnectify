import { BookOpen, Users, School } from "lucide-react";
import { MenuItem } from "./types";

export const knowledgeCommunityMenuItems: MenuItem = {
  icon: BookOpen,
  label: "Knowledge and Community",
  href: "/knowledge-community",
  subItems: [
    {
      icon: BookOpen,
      label: "Knowledge",
      href: "/knowledge-community/knowledge",
      subItems: [
        {
          icon: School,
          label: "MASTERCLASS",
          href: "/knowledge-community/knowledge/masterclass",
        }
      ],
    },
    {
      icon: Users,
      label: "Community",
      href: "/knowledge-community/community",
    },
  ],
};