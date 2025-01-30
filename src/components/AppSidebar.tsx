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
    <Sidebar className="border-r" role="navigation" aria-label="Main Navigation">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-6 py-4">
          <img
            src="/lovable-uploads/0676ad4e-4a1a-45f6-a430-a0e4711a5870.png"
            alt="Mr Genossenschaft"
            className="h-8"
            loading="eager"
            width={32}
            height={32}
          />
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