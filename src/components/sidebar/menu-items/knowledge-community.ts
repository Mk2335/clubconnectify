import { BookOpen, Users } from "lucide-react";
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
    },
    {
      icon: Users,
      label: "Community",
      href: "/knowledge-community/community",
    },
  ],
};