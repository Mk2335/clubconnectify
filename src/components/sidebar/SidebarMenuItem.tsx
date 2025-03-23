
import {
  SidebarMenuItem as BaseSidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <BaseSidebarMenuItem>
      <SidebarMenuButton isActive={isActive}>
        <Link to={href} className="flex items-center w-full">
          <Icon className="mr-2 h-4 w-4" />
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
      {subItems && (
        <SidebarMenuSub>
          {subItems.map((subItem) => {
            const isSubActive = location.pathname === subItem.href;
            return (
              <SidebarMenuSubItem key={subItem.label}>
                <SidebarMenuSubButton data-active={isSubActive}>
                  <Link to={subItem.href} className="flex items-center w-full">
                    <subItem.icon className="mr-2 h-4 w-4" />
                    <span>{subItem.label}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            );
          })}
        </SidebarMenuSub>
      )}
    </BaseSidebarMenuItem>
  );
}
