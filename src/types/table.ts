
import { Member } from "./member";

export interface SortConfig {
  key: keyof Member;
  direction: "asc" | "desc";
}

export interface MemberTableProps {
  members: Member[];
  onEdit: (memberId: string) => void;
  onDelete: (memberId: string) => void;
  onDeactivate: (memberId: string) => void;
  sortConfig: SortConfig | null;
  onSort: (key: keyof Member) => void;
  selectedMembers: string[];
  toggleMemberSelection: (memberId: string) => void;
  toggleAllMembers: (selected: boolean) => void;
  allSelected: boolean;
}
