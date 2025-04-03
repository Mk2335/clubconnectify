
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, X, Sliders } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface MemberSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  showAdvancedSearch?: boolean;
  onAdvancedSearchToggle?: () => void;
}

export const MemberSearchBar = ({
  searchQuery,
  onSearchChange,
  placeholder = "Search by name, email, or role...",
  showAdvancedSearch = false,
  onAdvancedSearchToggle
}: MemberSearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when pressing "/" key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full sm:w-auto flex-1 max-w-md relative">
      <div className={`relative rounded-md transition-shadow ${focused ? "ring-2 ring-ring ring-offset-1 ring-offset-background" : ""}`}>
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-8 pr-8"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-0 top-0 h-10" 
            onClick={() => onSearchChange("")}
            title="Clear search"
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {onAdvancedSearchToggle && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-2 bottom-[-30px] text-xs" 
          onClick={onAdvancedSearchToggle}
        >
          <Sliders className="h-3 w-3 mr-1" />
          {showAdvancedSearch ? "Simple Search" : "Advanced Search"}
        </Button>
      )}
      
      {showAdvancedSearch && (
        <Badge variant="secondary" className="absolute right-2 top-2">Advanced</Badge>
      )}
      
      {!focused && !searchQuery && (
        <div className="absolute right-3 top-2.5 text-xs text-muted-foreground opacity-70">
          Press / to search
        </div>
      )}
    </div>
  );
};
