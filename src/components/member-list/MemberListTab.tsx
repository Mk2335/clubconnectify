
import { MemberSearchAndFilter } from "./MemberSearchAndFilter";
import { MemberTableContainer } from "./MemberTableContainer";
import { MemberBulkActions } from "@/components/member/MemberBulkActions";
import { Member } from "@/types/member";
import { SortConfig } from "@/types/table";

interface MemberListTabProps {
  members: Member[];
  localSearchQuery: string;
  setLocalSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
  handleAddMember: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedMembers: string[];
  allSelected: boolean;
  toggleAllMembers: (selected: boolean) => void;
  handleBulkEmail: () => void;
  handleBulkDeactivate: () => void;
  handleBulkDelete: () => void;
  sortConfig: SortConfig | null;
  handleSort: (key: keyof Member) => void;
  handleEdit: (memberId: string) => void;
  handleDelete: (memberId: string) => void;
  handleDeactivate: (memberId: string) => void;
  toggleMemberSelection: (memberId: string) => void;
}

export const MemberListTab = ({
  members,
  localSearchQuery,
  setLocalSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  handleAddMember,
  handleFileUpload,
  selectedMembers,
  allSelected,
  toggleAllMembers,
  handleBulkEmail,
  handleBulkDeactivate,
  handleBulkDelete,
  sortConfig,
  handleSort,
  handleEdit,
  handleDelete,
  handleDeactivate,
  toggleMemberSelection
}: MemberListTabProps) => {
  return (
    <div className="space-y-4">
      {selectedMembers.length > 0 && (
        <MemberBulkActions
          selectedCount={selectedMembers.length}
          allSelected={allSelected}
          onToggleAll={toggleAllMembers}
          onEmail={handleBulkEmail}
          onDeactivate={handleBulkDeactivate}
          onDelete={handleBulkDelete}
        />
      )}
      
      <MemberSearchAndFilter 
        searchQuery={localSearchQuery}
        onSearchChange={setLocalSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        onAddMember={handleAddMember}
        onFileUpload={handleFileUpload}
      />

      <MemberTableContainer 
        members={members}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleDeactivate={handleDeactivate}
        sortConfig={sortConfig}
        handleSort={handleSort}
        selectedMembers={selectedMembers}
        toggleMemberSelection={toggleMemberSelection}
        toggleAllMembers={toggleAllMembers}
      />
    </div>
  );
};
