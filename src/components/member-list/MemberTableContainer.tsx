
import { Member } from "@/types/member";
import { MemberTable } from "@/components/member/MemberTable";
import { SortConfig } from "@/types/table";

interface MemberTableContainerProps {
  members: Member[];
  handleEdit: (memberId: string) => void;
  handleDelete: (memberId: string) => void;
  handleDeactivate: (memberId: string) => void;
  sortConfig: SortConfig | null;
  handleSort: (key: keyof Member) => void;
  selectedMembers: string[];
  toggleMemberSelection: (memberId: string) => void;
  toggleAllMembers: (selected: boolean) => void;
  searchQuery?: string; // Add this prop
}

export const MemberTableContainer = ({
  members,
  handleEdit,
  handleDelete,
  handleDeactivate,
  sortConfig,
  handleSort,
  selectedMembers,
  toggleMemberSelection,
  toggleAllMembers,
  searchQuery = '' // Add default value
}: MemberTableContainerProps) => {
  // Ensure we have valid arrays to work with
  const membersList = Array.isArray(members) ? members : [];
  const selectedMembersList = Array.isArray(selectedMembers) ? selectedMembers : [];
  
  // Check if all members are selected
  const allSelected = membersList.length > 0 && 
    membersList.every(member => selectedMembersList.includes(member.id));

  return (
    <div className="rounded-md border">
      <MemberTable
        members={membersList}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDeactivate={handleDeactivate}
        sortConfig={sortConfig}
        onSort={handleSort}
        selectedMembers={selectedMembersList}
        toggleMemberSelection={toggleMemberSelection}
        toggleAllMembers={toggleAllMembers}
        allSelected={allSelected}
        searchQuery={searchQuery}
      />
    </div>
  );
};
