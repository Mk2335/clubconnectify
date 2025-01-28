import { BookOpen, Users, GraduationCap, School, BookOpenCheck } from "lucide-react";
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
          subItems: [
            {
              icon: School,
              label: "MASTERCLASS",
              href: "/knowledge-community/knowledge/courses/masterclass",
            },
            {
              icon: BookOpenCheck,
              label: "MASTERMIND",
              href: "/knowledge-community/knowledge/courses/mastermind",
            },
          ],
        },
      ],
    },
    {
      icon: Users,
      label: "Community",
      href: "/knowledge-community/community",
    },
  ],
};