
import { useState } from "react";
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
  toggleAllMembers
}: MemberTableContainerProps) => {
  // Check if all members are selected
  const allSelected = members.length > 0 && 
    members.every(member => selectedMembers.includes(member.id));

  return (
    <div className="rounded-md border">
      <MemberTable
        members={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDeactivate={handleDeactivate}
        sortConfig={sortConfig}
        onSort={handleSort}
        selectedMembers={selectedMembers}
        toggleMemberSelection={toggleMemberSelection}
        toggleAllMembers={toggleAllMembers}
        allSelected={allSelected}
      />
    </div>
  );
};
