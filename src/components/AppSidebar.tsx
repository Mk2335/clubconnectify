import { Rocket } from "lucide-react";
import { Sidebar, SidebarHeader } from "@/components/ui/sidebar";
import { SidebarMenu } from "@/components/sidebar/SidebarMenu";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-6 py-4">
          <img
            src="/lovable-uploads/0676ad4e-4a1a-45f6-a430-a0e4711a5870.png"
            alt="Mr Genossenschaft"
            className="h-8"
          />
        </div>
      </SidebarHeader>
      <SidebarMenu />
    </Sidebar>
  );
}