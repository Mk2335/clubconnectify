
import React, { useState } from 'react';
import { MemberListProps } from "@/types/member";
import { MemberCommunicationTabs } from "./communication/MemberCommunicationTabs";
import { MemberListTab } from "./member-list/MemberListTab";
import { useRealtimeMembers } from "@/hooks/useRealtimeMembers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { MemberForm } from "./member/MemberForm";
import { Button } from "./ui/button";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const { members, loading } = useRealtimeMembers();
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"list" | "communication">("list");

  // Derive filtered and sorted members (similar to original implementation)
  const sortedAndFilteredMembers = React.useMemo(() => {
    let result = [...members];
    
    if (searchQuery) {
      result = result.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [members, searchQuery]);

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsAddMemberDialogOpen(true);
  };

  const handleEditMember = (member: any) => {
    setSelectedMember(member);
    setIsAddMemberDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-muted-foreground">No members found.</p>
        <Button onClick={handleAddMember}>Add First Member</Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as "list" | "communication")} 
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">Member List</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>
          <Button onClick={handleAddMember}>Add Member</Button>
        </div>
      
        <TabsContent value="list" className="space-y-4 mt-0">
          <MemberListTab 
            members={sortedAndFilteredMembers}
            onEditMember={handleEditMember}
          />
        </TabsContent>

        <TabsContent value="communication" className="mt-0">
          <MemberCommunicationTabs 
            members={members}
            selectedMembers={[]}
          />
        </TabsContent>
      </Tabs>

      <Dialog 
        open={isAddMemberDialogOpen} 
        onOpenChange={setIsAddMemberDialogOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedMember ? 'Edit Member' : 'Add New Member'}
            </DialogTitle>
          </DialogHeader>
          <MemberForm 
            initialData={selectedMember} 
            onClose={() => setIsAddMemberDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
