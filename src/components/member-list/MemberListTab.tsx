
import { MemberSearchAndFilter } from "./MemberSearchAndFilter";
import { MemberTableContainer } from "./MemberTableContainer";
import { MemberBulkActions } from "@/components/member/MemberBulkActions";
import { Member } from "@/types/member";
import { SortConfig } from "@/types/table";

interface MemberListTabProps {
  members: Member[];
  onEdit?: (memberId: string) => void;
  onDelete?: (memberId: string) => void;
  onDeactivate?: (memberId: string) => void;
  sortConfig?: SortConfig | null;
  handleSort?: (key: keyof Member) => void;
  selectedMembers?: string[];
  toggleMemberSelection?: (memberId: string) => void;
  toggleAllMembers?: (selected: boolean) => void;
  handleBulkEmail?: () => void;
  handleBulkDeactivate?: () => void;
  handleBulkDelete?: () => void;
  localSearchQuery?: string;
  setLocalSearchQuery?: (query: string) => void;
  statusFilter?: string;
  setStatusFilter?: (status: string) => void;
  typeFilter?: string;
  setTypeFilter?: (type: string) => void;
  handleAddMember?: () => void;
  handleFileUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allSelected?: boolean;
}

export const MemberListTab = ({
  members = [],
  onEdit = () => {},
  onDelete = () => {},
  onDeactivate = () => {},
  sortConfig = null,
  handleSort = () => {},
  selectedMembers = [],
  toggleMemberSelection = () => {},
  toggleAllMembers = () => {},
  handleBulkEmail = () => {},
  handleBulkDeactivate = () => {},
  handleBulkDelete = () => {},
  localSearchQuery = "",
  setLocalSearchQuery = () => {},
  statusFilter = "all",
  setStatusFilter = () => {},
  typeFilter = "all",
  setTypeFilter = () => {},
  handleAddMember = () => {},
  handleFileUpload = () => {},
  allSelected = false
}: MemberListTabProps) => {
  // Make sure members is always an array
  const membersList = Array.isArray(members) ? members : [];

  return (
    <div className="space-y-4">
      {selectedMembers && selectedMembers.length > 0 && (
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
        members={membersList}
        handleEdit={onEdit}
        handleDelete={onDelete}
        handleDeactivate={onDeactivate}
        sortConfig={sortConfig}
        handleSort={handleSort}
        selectedMembers={selectedMembers || []}
        toggleMemberSelection={toggleMemberSelection}
        toggleAllMembers={toggleAllMembers}
      />
    </div>
  );
};
