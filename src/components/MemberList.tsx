
import { MemberListProps } from "@/types/member";
import { MemberCommunicationTabs } from "./communication/MemberCommunicationTabs";
import { MemberListTab } from "./member-list/MemberListTab";
import { useMemberList } from "./member-list/useMemberList";
import { initialMembers } from "./member-list/MemberListData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

/**
 * Main component for managing and displaying member data
 * Handles member listing, importing, sorting, and filtering functionality
 */
export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const {
    sortedAndFilteredMembers,
    sortConfig,
    localSearchQuery,
    setLocalSearchQuery,
    statusFilter, 
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    selectedMembers,
    activeTab,
    setActiveTab,
    members,
    handleSort,
    handleEdit,
    handleDelete,
    handleDeactivate,
    handleAddMember,
    toggleMemberSelection,
    toggleAllMembers,
    allSelected,
    handleBulkEmail,
    handleBulkDeactivate,
    handleBulkDelete,
    handleFileUpload
  } = useMemberList(initialMembers);

  if (!members.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No members found.</p>
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
        <TabsList className="mb-4">
          <TabsTrigger value="list">Member List</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
      
        <TabsContent value="list" className="space-y-4 mt-0">
          <MemberListTab 
            members={sortedAndFilteredMembers}
            localSearchQuery={localSearchQuery}
            setLocalSearchQuery={setLocalSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            handleAddMember={handleAddMember}
            handleFileUpload={handleFileUpload}
            selectedMembers={selectedMembers}
            allSelected={allSelected}
            toggleAllMembers={toggleAllMembers}
            handleBulkEmail={handleBulkEmail}
            handleBulkDeactivate={handleBulkDeactivate}
            handleBulkDelete={handleBulkDelete}
            sortConfig={sortConfig}
            handleSort={handleSort}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleDeactivate={handleDeactivate}
            toggleMemberSelection={toggleMemberSelection}
          />
        </TabsContent>

        <TabsContent value="communication" className="mt-0">
          <MemberCommunicationTabs 
            members={members}
            selectedMembers={selectedMembers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
