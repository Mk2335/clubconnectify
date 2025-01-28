import {
  SidebarMenuItem as BaseSidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

interface SubItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  subItems?: SubItem[];
}

export function SidebarMenuItem({ icon: Icon, label, href, subItems }: MenuItemProps) {
  return (
    <BaseSidebarMenuItem>
      <SidebarMenuButton>
        <a href={href} className="flex items-center">
          <Icon className="mr-2 h-4 w-4" />
          <span>{label}</span>
        </a>
      </SidebarMenuButton>
      {subItems && (
        <SidebarMenuSub>
          {subItems.map((subItem) => (
            <SidebarMenuSubItem key={subItem.label}>
              <SidebarMenuSubButton>
                <a href={subItem.href} className="flex items-center">
                  <subItem.icon className="mr-2 h-4 w-4" />
                  <span>{subItem.label}</span>
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </BaseSidebarMenuItem>
  );
}