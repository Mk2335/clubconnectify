import {
  SidebarMenu as BaseSidebarMenu,
} from "@/components/ui/sidebar";
import { SidebarMenuItem } from "./SidebarMenuItem";
import { menuItems } from "./menuItems";

export function SidebarMenu() {
  return (
    <BaseSidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.label} {...item} />
      ))}
    </BaseSidebarMenu>
  );
}