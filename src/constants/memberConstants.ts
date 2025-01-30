/**
 * Constants used throughout the member management system
 */

export const MEMBER_STATUS = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
  PENDING: "Pending",
} as const;

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
} as const;

export const TOAST_MESSAGES = {
  IMPORT_SUCCESS: "Members have been imported successfully.",
  IMPORT_ERROR: "Failed to import members. Please check your CSV file format.",
  EDIT_SUCCESS: "Member updated successfully.",
  DELETE_SUCCESS: "Member deleted successfully.",
  DEACTIVATE_SUCCESS: "Member deactivated successfully.",
} as const;