import { BookOpen, Users, School, Headphones, Book, Network } from "lucide-react";
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