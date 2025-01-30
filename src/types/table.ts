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
}