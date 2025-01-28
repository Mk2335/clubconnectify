import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Database,
  Home,
  Users,
  Calendar,
  Vote,
  DollarSign,
  List,
  Settings,
  Cable,
  Users2,
} from "lucide-react";

const menuItems = [
  { icon: Database, label: "Company Selection", href: "/company" },
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Users, label: "Members", href: "/members" },
  { icon: Calendar, label: "Dates", href: "/dates" },
  {
    icon: Vote,
    label: "Voting",
    href: "/voting",
    subItems: [
      {
        icon: Users2,
        label: "General Assembly",
        href: "/voting/general-assembly",
      },
    ],
  },
  { icon: DollarSign, label: "Financing", href: "/financing" },
  { icon: List, label: "Tasks", href: "/tasks" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Cable, label: "Integrations", href: "/integrations" },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center">
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                  {item.subItems && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.href} className="flex items-center">
                              <subItem.icon className="mr-2 h-4 w-4" />
                              <span>{subItem.label}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}