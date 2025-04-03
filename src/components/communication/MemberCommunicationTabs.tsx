
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailIntegration } from "./EmailIntegration";
import { NotificationSettings } from "./NotificationSettings";
import { CommunicationHistory } from "./CommunicationHistory";
import { Member } from "@/types/member";
import { Mail, Bell, History } from "lucide-react";

interface MemberCommunicationTabsProps {
  members: Member[];
  selectedMembers: string[];
}

export function MemberCommunicationTabs({ members, selectedMembers }: MemberCommunicationTabsProps) {
  const [activeTab, setActiveTab] = useState("email");
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="mt-0">
          <EmailIntegration selectedMembers={selectedMembers} />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-0">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <CommunicationHistory members={members} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
