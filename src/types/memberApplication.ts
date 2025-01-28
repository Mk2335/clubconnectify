import { type CheckedState } from "@radix-ui/react-checkbox"

export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  street: string;
  additionalAddress: string;
  zipCode: string;
  city: string;
  email: string;
  emailConfirm: string;
  taxId: string;
  shares: number;
  membershipType: "new" | "existing";
  memberId?: string;
  acceptTerms: CheckedState;
  acceptNotice: CheckedState;
  isInvestingMember: CheckedState;
  acceptLiability: CheckedState;
  acceptFees: CheckedState;
  acceptDocuments: CheckedState;
}