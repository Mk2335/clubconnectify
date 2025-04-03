
/**
 * Constants used throughout the member management system
 */

export const MEMBER_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PENDING: "Pending",
} as const;

export const MEMBER_TYPE = {
  INDIVIDUAL: "Individual",
  COMPANY: "Company",
} as const;

export const PAYMENT_METHOD = {
  BANK_TRANSFER: "Bank Transfer", // Überweisung
  DIRECT_DEBIT: "Direct Debit",   // Lastschrift
  OTHER: "Other",
} as const;

export const MEMBER_ROLES = [
  { id: "1", name: "Active Member", code: "AM", color: "blue" },
  { id: "2", name: "Adult Member", code: "ERW", color: "green" },
  { id: "3", name: "Supporting Member", code: "S", color: "purple" },
] as const;

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
} as const;

export const TABLE_HEADERS = {
  NAME: "Name",
  EMAIL: "Email",
  STATUS: "Status",
  JOIN_DATE: "Join Date",
  ACTIONS: "Actions",
  ROLE: "Role",
  PAYMENT_METHOD: "Payment Method",
  TYPE: "Type",
} as const;

export const TOAST_MESSAGES = {
  IMPORT_SUCCESS: "Members have been imported successfully.",
  IMPORT_ERROR: "Failed to import members. Please check your CSV file format.",
  EDIT_SUCCESS: "Member updated successfully.",
  DELETE_SUCCESS: "Member deleted successfully.",
  DEACTIVATE_SUCCESS: "Member deactivated successfully.",
} as const;
