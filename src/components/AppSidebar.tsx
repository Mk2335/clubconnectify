/**
 * Main sidebar component for the application
 * Provides navigation and cooperative selection functionality
 */

import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarMenu } from "@/components/sidebar/SidebarMenu";
import { CooperativeSelector } from "./company/CooperativeSelector";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-6 py-4">
        </div>
      </SidebarHeader>
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          <CooperativeSelector />
          <SidebarMenu />
        </div>
      </ScrollArea>
    </Sidebar>
  );
}