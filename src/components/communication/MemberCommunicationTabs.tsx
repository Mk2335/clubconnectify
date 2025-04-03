
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailIntegration } from "./EmailIntegration";
import { CommunicationHistory } from "./CommunicationHistory";
import { Member } from "@/types/member";
import { Mail, History, AlertCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface MemberCommunicationTabsProps {
  members: Member[];
  selectedMembers: string[];
}

export function MemberCommunicationTabs({ 
  members, 
  selectedMembers 
}: MemberCommunicationTabsProps) {
  const [activeTab, setActiveTab] = useState("email");
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className={isMobile ? "w-full" : ""}>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{!isMobile && "Email"}</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>{!isMobile && "Communication History"}</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            <span>{!isMobile && "Notifications"}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="p-0 mt-6">
          <EmailIntegration selectedMembers={selectedMembers} />
        </TabsContent>

        <TabsContent value="history" className="p-0 mt-6">
          <CommunicationHistory members={members} />
        </TabsContent>

        <TabsContent value="notifications" className="p-0 mt-6">
          <div className="text-center p-8 border rounded-lg bg-muted/20">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium mb-2">Notifications Center</h3>
            <p className="text-muted-foreground">
              Configure automated notifications and alerts for your members.
              This feature will be available soon.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
