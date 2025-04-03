
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailIntegration } from "./EmailIntegration";
import { CommunicationHistory } from "./CommunicationHistory";
import { Member } from "@/types/member";
import { Mail, History } from "lucide-react";

interface MemberCommunicationTabsProps {
  members: Member[];
  selectedMembers: string[];
}

export function MemberCommunicationTabs({ 
  members, 
  selectedMembers 
}: MemberCommunicationTabsProps) {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Communication History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="p-0 mt-6">
          <EmailIntegration selectedMembers={selectedMembers} />
        </TabsContent>

        <TabsContent value="history" className="p-0 mt-6">
          <CommunicationHistory members={members} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
