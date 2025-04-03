
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, BrainCircuit } from "lucide-react";

interface MemberSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSmartSearch: () => void;
  advancedSearchActive: boolean;
}

export const MemberSearchBar = ({
  searchQuery,
  onSearchChange,
  onSmartSearch,
  advancedSearchActive
}: MemberSearchBarProps) => {
  return (
    <div className="w-full sm:w-auto flex-1 max-w-md relative">
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 pr-8"
        />
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-0 top-0 h-10" 
            onClick={() => onSearchChange("")}
            title="Clear search"
          >
            &times;
          </Button>
        )}
      </div>
      {advancedSearchActive && (
        <Badge variant="secondary" className="absolute right-2 top-2">AI Active</Badge>
      )}
    </div>
  );
};
