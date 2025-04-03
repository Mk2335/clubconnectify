
export const MEMBER_STATUS = {
  ACTIVE: "Active" as const,
  INACTIVE: "Inactive" as const,
  PENDING: "Pending" as const
};

export const MEMBER_TYPE = {
  INDIVIDUAL: "Individual" as const,
  COMPANY: "Company" as const
};

export const PAYMENT_METHOD = {
  BANK_TRANSFER: "Bank Transfer" as const,
  DIRECT_DEBIT: "Direct Debit" as const,
  OTHER: "Other" as const
};

export const TABLE_HEADERS = {
  NAME: "Name",
  EMAIL: "Email",
  STATUS: "Status",
  JOIN_DATE: "Join Date",
  ACTIONS: "Actions",
  ROLE: "Role",
  TYPE: "Type",
  PAYMENT_METHOD: "Payment Method"
};

export const TOAST_MESSAGES = {
  CREATE_SUCCESS: "Member has been successfully created.",
  UPDATE_SUCCESS: "Member has been successfully updated.",
  DELETE_SUCCESS: "Member has been successfully deleted.",
  DEACTIVATE_SUCCESS: "Member has been deactivated.",
  IMPORT_SUCCESS: "Members have been successfully imported.",
  IMPORT_ERROR: "Error importing members. Please check your file format.",
  EDIT_SUCCESS: "Member has been successfully edited."
};
