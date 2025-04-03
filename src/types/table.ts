
import { Member } from "./member";

export interface SortConfig {
  key: keyof Member;
  direction: 'asc' | 'desc';
}

export interface MemberTableProps {
  members: Member[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDeactivate: (id: string) => void;
  sortConfig: SortConfig | null;
  onSort: (key: keyof Member) => void;
  selectedMembers: string[];
  toggleMemberSelection: (id: string) => void;
  toggleAllMembers: (selected: boolean) => void;
  allSelected: boolean;
}

export interface FilterOptions {
  status: string;
  type: string;
  role: string;
  paymentMethod: string;
}
