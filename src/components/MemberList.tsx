
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
import { SortConfig } from "@/types/table";
import { Member } from "@/types/member";
import { toast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const { members, loading } = useRealtimeMembers();
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [activeTab, setActiveTab] = useState<"list" | "communication">("list");
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Derive filtered and sorted members
  const sortedAndFilteredMembers = React.useMemo(() => {
    let result = [...members];
    
    // Apply search filter
    if (localSearchQuery) {
      result = result.filter((member) =>
        member.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(localSearchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((member) => member.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((member) => member.type === typeFilter);
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Member];
        const bValue = b[sortConfig.key as keyof Member];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [members, localSearchQuery, sortConfig, statusFilter, typeFilter]);

  const handleAddMember = () => {
    setSelectedMember(null);
    setIsAddMemberDialogOpen(true);
  };

  const handleEditMember = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (member) {
      setSelectedMember(member);
      setIsAddMemberDialogOpen(true);
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;
      
      toast({
        title: "Member Deleted",
        description: "The member has been successfully deleted."
      });
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
    }
  };

  const handleDeactivateMember = async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ status: "Inactive" })
        .eq('id', memberId);
      
      if (error) throw error;
      
      toast({
        title: "Member Deactivated",
        description: "The member has been deactivated."
      });
    } catch (error) {
      console.error('Error deactivating member:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate member",
        variant: "destructive",
      });
    }
  };

  const handleSort = (key: keyof Member) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === key) {
        return {
          key,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const toggleMemberSelection = (memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const toggleAllMembers = (selected: boolean) => {
    if (selected) {
      const allMemberIds = sortedAndFilteredMembers.map(member => member.id);
      setSelectedMembers(allMemberIds);
    } else {
      setSelectedMembers([]);
    }
  };

  const allSelected = sortedAndFilteredMembers.length > 0 && 
    sortedAndFilteredMembers.every(member => selectedMembers.includes(member.id));

  const handleBulkEmail = () => {
    setActiveTab("communication");
  };

  const handleBulkDeactivate = async () => {
    try {
      for (const memberId of selectedMembers) {
        const { error } = await supabase
          .from('members')
          .update({ status: "Inactive" })
          .eq('id', memberId);
        
        if (error) throw error;
      }
      
      toast({
        title: "Members Deactivated",
        description: `${selectedMembers.length} members have been deactivated.`
      });
      
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error deactivating members:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate members",
        variant: "destructive",
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (const memberId of selectedMembers) {
        const { error } = await supabase
          .from('members')
          .delete()
          .eq('id', memberId);
        
        if (error) throw error;
      }
      
      toast({
        title: "Members Deleted",
        description: `${selectedMembers.length} members have been deleted.`
      });
      
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error deleting members:', error);
      toast({
        title: "Error",
        description: "Failed to delete members",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // We'll implement this later
    toast({
      title: "File Upload",
      description: "File upload functionality will be implemented soon."
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!members || members.length === 0) {
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
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
            onDeactivate={handleDeactivateMember}
            sortConfig={sortConfig}
            handleSort={handleSort}
            selectedMembers={selectedMembers}
            toggleMemberSelection={toggleMemberSelection}
            toggleAllMembers={toggleAllMembers}
            handleBulkEmail={handleBulkEmail}
            handleBulkDeactivate={handleBulkDeactivate}
            handleBulkDelete={handleBulkDelete}
            localSearchQuery={localSearchQuery}
            setLocalSearchQuery={setLocalSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            handleAddMember={handleAddMember}
            handleFileUpload={handleFileUpload}
            allSelected={allSelected}
          />
        </TabsContent>

        <TabsContent value="communication" className="mt-0">
          <MemberCommunicationTabs 
            members={members}
            selectedMembers={selectedMembers}
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
