
import { Member } from "@/types/member";

/**
 * Format a date string to a localized format
 */
export const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch (e) {
    return dateString;
  }
};

/**
 * Get CSS class for member status badge
 */
export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case 'Active':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800';
    case 'Inactive':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
    case 'Pending':
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
    default:
      return 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
  }
};

/**
 * Get CSS class for payment method badge
 */
export const getPaymentMethodBadgeClass = (method: string): string => {
  switch (method) {
    case 'Bank Transfer':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    case 'Direct Debit':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

/**
 * Get CSS class for role badge
 */
export const getRoleBadgeClass = (role: string): string => {
  switch (role.toLowerCase()) {
    case 'admin':
    case 'administrator':
      return 'bg-purple-50 text-purple-700 ring-purple-600/20';
    case 'board member':
    case 'board':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20';
    case 'moderator':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

/**
 * Validate member data
 */
export const validateMemberData = (member: Member): boolean => {
  if (!member.name || !member.email) {
    return false;
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(member.email);
};
