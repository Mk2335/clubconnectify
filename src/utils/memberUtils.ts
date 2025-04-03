
/**
 * Utility functions for member management
 */

import { Member } from "@/types/member";
import { MEMBER_ROLES } from "@/constants/memberConstants";

/**
 * Formats a date string to a localized date format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString();
};

/**
 * Gets the CSS class for member status badge
 * @param status - Member status
 * @returns CSS class string
 */
export const getStatusBadgeClass = (status: Member["status"]): string => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (status) {
    case "Active":
      return `${baseClasses} text-green-600 bg-green-50`;
    case "Inactive":
      return `${baseClasses} text-red-600 bg-red-50`;
    case "Pending":
      return `${baseClasses} text-yellow-600 bg-yellow-50`;
    default:
      return baseClasses;
  }
};

/**
 * Gets the CSS class for payment method badge
 * @param method - Payment method
 * @returns CSS class string
 */
export const getPaymentMethodBadgeClass = (method: string): string => {
  const baseClasses = "text-xs font-medium";
  switch (method) {
    case "Bank Transfer":
      return `${baseClasses} text-blue-600 border-blue-200`;
    case "Direct Debit":
      return `${baseClasses} text-purple-600 border-purple-200`;
    default:
      return `${baseClasses} text-gray-600 border-gray-200`;
  }
};

/**
 * Gets the CSS class for role badge
 * @param role - Member role
 * @returns CSS class string
 */
export const getRoleBadgeClass = (role: string): string => {
  const baseClasses = "text-xs font-medium";
  const roleObj = MEMBER_ROLES.find(r => r.code === role);
  
  switch (roleObj?.color) {
    case "blue":
      return `${baseClasses} text-blue-600 border-blue-200`;
    case "green":
      return `${baseClasses} text-green-600 border-green-200`;
    case "purple":
      return `${baseClasses} text-purple-600 border-purple-200`;
    default:
      return `${baseClasses} text-gray-600 border-gray-200`;
  }
};

/**
 * Validates member data from CSV import
 * @param data - Raw member data
 * @returns Validated member object
 */
export const validateMemberData = (data: Partial<Member>): boolean => {
  return !!(data.name && data.email);
};
