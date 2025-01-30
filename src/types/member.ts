export interface Member {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
}

export interface MemberListProps {
  searchQuery?: string;
}