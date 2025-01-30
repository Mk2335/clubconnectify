/**
 * Utility functions for member management
 */

import { Member } from "@/types/member";

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
 * Validates member data from CSV import
 * @param data - Raw member data
 * @returns Validated member object
 */
export const validateMemberData = (data: Partial<Member>): boolean => {
  return !!(data.name && data.email);
};