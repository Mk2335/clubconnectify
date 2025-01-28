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
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
  FileText,
  Gavel,
  Mail,
  Building2,
  ClipboardCheck,
} from "lucide-react";

const menuItems = [
  {
    icon: Database,
    label: "Company Selection",
    href: "/company",
    subItems: [
      {
        icon: Building2,
        label: "Incorporation",
        href: "/company/incorporation",
      },
      {
        icon: ClipboardCheck,
        label: "Statutory Audit",
        href: "/company/audit",
      },
    ],
  },
  { icon: Home, label: "Dashboard", href: "/" },
  { icon: Users, label: "Members", href: "/members" },
  { icon: Calendar, label: "Dates", href: "/dates" },
  {
    icon: Gavel,
    label: "General Assembly",
    href: "/general-assembly",
    subItems: [
      {
        icon: Vote,
        label: "Voting",
        href: "/general-assembly/voting",
      },
      {
        icon: FileText,
        label: "Minutes",
        href: "/general-assembly/minutes",
      },
      {
        icon: Mail,
        label: "Newsletter",
        href: "/general-assembly/newsletter",
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