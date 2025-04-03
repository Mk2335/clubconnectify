
import React from 'react';
import { Member } from "@/types/member";

/**
 * Advanced search function for members
 * Supports multiple terms, exact phrase matching, and field-specific search
 */
export const advancedSearch = (
  members: Member[], 
  query: string, 
  fields: (keyof Member)[] = ['name', 'email', 'role'],
  caseSensitive: boolean = false
): Member[] => {
  
  if (!query || query.trim() === '') {
    return members;
  }
  
  // Parse query for exact phrases in quotes
  const exactPhrases: string[] = [];
  const processedQuery = query.replace(/"([^"]*)"/g, (_, phrase) => {
    exactPhrases.push(phrase);
    return '';
  }).trim();
  
  // Remaining individual terms
  const terms = processedQuery
    .split(' ')
    .filter(Boolean)
    .map(term => caseSensitive ? term : term.toLowerCase());
  
  return members.filter(member => {
    // Check for exact phrases
    const hasAllExactPhrases = exactPhrases.every(phrase => {
      return fields.some(field => {
        const value = String(member[field] || '');
        return caseSensitive 
          ? value.includes(phrase)
          : value.toLowerCase().includes(phrase.toLowerCase());
      });
    });
    
    if (!hasAllExactPhrases) return false;
    
    // Check for individual terms
    const hasAllTerms = terms.every(term => {
      return fields.some(field => {
        const value = String(member[field] || '');
        return caseSensitive
          ? value.includes(term)
          : value.toLowerCase().includes(term.toLowerCase());
      });
    });
    
    return hasAllTerms;
  });
};

/**
 * Helper function to highlight search terms in text
 */
export const highlightSearchTerms = (text: string, searchQuery: string): React.ReactNode => {
  if (!searchQuery || searchQuery.trim() === '') {
    return text;
  }
  
  // Get terms from the query (including quoted phrases)
  const exactPhrases: string[] = [];
  searchQuery.replace(/"([^"]*)"/g, (_, phrase) => {
    exactPhrases.push(phrase);
    return '';
  });
  
  const terms = searchQuery
    .replace(/"([^"]*)"/g, '')
    .split(' ')
    .filter(Boolean)
    .concat(exactPhrases);
  
  // Sort terms by length (descending) to highlight longer terms first
  const sortedTerms = terms.sort((a, b) => b.length - a.length);
  
  let result = text;
  sortedTerms.forEach(term => {
    if (term.trim() === '') return;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    result = result.replace(regex, '<mark>$1</mark>');
  });
  
  // Convert to React elements
  const parts = result.split(/<mark>|<\/mark>/);
  return parts.map((part, i) => {
    // Every odd index is a matched term
    return i % 2 === 1 
      ? <mark key={i} className="bg-yellow-100 text-yellow-800 px-0.5 rounded-sm">{part}</mark>
      : part;
  });
};

/**
 * Extract search context from text for showing preview
 */
export const extractSearchContext = (
  text: string, 
  searchQuery: string, 
  contextLength: number = 50
): string => {
  if (!text || !searchQuery || searchQuery.trim() === '') {
    return text;
  }
  
  const lowerText = text.toLowerCase();
  const lowerQuery = searchQuery.toLowerCase();
  
  // Find first occurrence of any search term
  let firstIndex = lowerText.indexOf(lowerQuery);
  
  // If exact match not found, try individual terms
  if (firstIndex === -1) {
    const terms = searchQuery.split(' ').filter(Boolean);
    for (const term of terms) {
      const index = lowerText.indexOf(term.toLowerCase());
      if (index !== -1) {
        firstIndex = index;
        break;
      }
    }
  }
  
  // If still no match, just return beginning of text
  if (firstIndex === -1) {
    return text.length > contextLength 
      ? text.substring(0, contextLength) + '...'
      : text;
  }
  
  // Calculate start and end points for context
  const halfContext = Math.floor(contextLength / 2);
  let start = Math.max(0, firstIndex - halfContext);
  let end = Math.min(text.length, firstIndex + halfContext);
  
  // Adjust if we're near the beginning or end
  if (start === 0) {
    end = Math.min(text.length, contextLength);
  } else if (end === text.length) {
    start = Math.max(0, text.length - contextLength);
  }
  
  // Add ellipsis if needed
  let result = text.substring(start, end);
  if (start > 0) result = '...' + result;
  if (end < text.length) result = result + '...';
  
  return result;
};
