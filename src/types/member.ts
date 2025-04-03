
export interface Member {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
  profilePicture?: string;
  role?: string;
  paymentMethod?: "Bank Transfer" | "Direct Debit" | "Other";
  type: "Individual" | "Company";
  companyDetails?: {
    companyName: string;
    registrationNumber: string;
    contactPerson: string;
  };
}

export interface MemberListProps {
  searchQuery?: string;
}

export interface MemberRole {
  id: string;
  name: string;
  code: string;
  color: string;
}
