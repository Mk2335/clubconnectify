
import { Member } from "@/types/member";
import { MEMBER_STATUS } from "@/constants/memberConstants";

export const initialMembers: Member[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: MEMBER_STATUS.ACTIVE,
    joinDate: "2024-01-15",
    profilePicture: "",
    role: "AM",
    paymentMethod: "Bank Transfer",
    type: "Individual"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: MEMBER_STATUS.ACTIVE,
    joinDate: "2024-02-01",
    profilePicture: "",
    role: "ERW",
    paymentMethod: "Direct Debit",
    type: "Individual"
  },
  {
    id: "3",
    name: "Acme Corporation",
    email: "info@acme.com",
    status: MEMBER_STATUS.ACTIVE,
    joinDate: "2024-03-05",
    profilePicture: "",
    role: "S",
    paymentMethod: "Bank Transfer",
    type: "Company",
    companyDetails: {
      companyName: "Acme Corporation",
      registrationNumber: "AC12345",
      contactPerson: "Robert Johnson"
    }
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    status: MEMBER_STATUS.PENDING,
    joinDate: "2024-04-01",
    profilePicture: "",
    paymentMethod: "Other",
    type: "Individual"
  },
  {
    id: "5",
    name: "Tech Innovators Ltd",
    email: "contact@techinnovators.com",
    status: MEMBER_STATUS.INACTIVE,
    joinDate: "2023-11-15",
    profilePicture: "",
    role: "AM",
    paymentMethod: "Direct Debit",
    type: "Company",
    companyDetails: {
      companyName: "Tech Innovators Ltd",
      registrationNumber: "TI98765",
      contactPerson: "Emma Chen"
    }
  }
];
