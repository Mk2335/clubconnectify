
import { highlightSearchTerms } from "@/utils/searchUtils";

interface HighlightedTextProps {
  text: string;
  searchQuery: string;
}

export const HighlightedText = ({ text, searchQuery }: HighlightedTextProps) => {
  if (!searchQuery || searchQuery.trim() === '') {
    return <>{text}</>;
  }
  
  return <>{highlightSearchTerms(text, searchQuery)}</>;
};
