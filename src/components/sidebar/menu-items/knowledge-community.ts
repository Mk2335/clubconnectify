import { BookOpen, Users, School, Headphones, Book, Network, GraduationCap } from "lucide-react";
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
          icon: GraduationCap,
          label: "Courses",
          href: "/knowledge-community/knowledge/courses",
        },
        {
          icon: Headphones,
          label: "Podcasts",
          href: "/knowledge-community/knowledge/podcasts",
        },
        {
          icon: Book,
          label: "eBooks",
          href: "/knowledge-community/knowledge/ebooks",
        }
      ],
    },
    {
      icon: Users,
      label: "Community",
      href: "/knowledge-community/community",
    },
    {
      icon: Network,
      label: "Connect",
      href: "/knowledge-community/connect",
    },
  ],
};