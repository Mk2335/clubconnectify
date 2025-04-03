
import React, { useState, useEffect, useRef } from 'react';
import { Input } from './input';
import { Button } from './button';
import { 
  Search, 
  X, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from './popover';
import { useIsMobile } from '@/hooks/use-mobile';

interface SearchOption {
  label: string;
  value: string;
  checked: boolean;
}

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  fields?: SearchOption[];
  onFieldsChange?: (fields: string[]) => void;
  advancedOptions?: React.ReactNode;
  className?: string;
  showFilterButton?: boolean;
  onFilterClick?: () => void;
  disabled?: boolean;
  showSearchButton?: boolean;
  searchButtonText?: string;
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  fields,
  onFieldsChange,
  advancedOptions,
  className = "",
  showFilterButton = false,
  onFilterClick,
  disabled = false,
  showSearchButton = false,
  searchButtonText = "Search"
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(value);
  const [showOptions, setShowOptions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Sync with parent value
  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange('');
    searchInputRef.current?.focus();
  };

  const toggleField = (fieldValue: string) => {
    if (!fields || !onFieldsChange) return;
    
    const updatedFields = fields.map(field => {
      if (field.value === fieldValue) {
        return { ...field, checked: !field.checked };
      }
      return field;
    });
    
    onFieldsChange(updatedFields.filter(f => f.checked).map(f => f.value));
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative flex items-center gap-2 ${className}`}
    >
      <div className="relative flex-1">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={searchInputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          className="pl-8 pr-8"
          disabled={disabled}
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-2 py-0"
            onClick={handleClear}
            disabled={disabled}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>
      
      {(fields && fields.length > 0 && onFieldsChange) && (
        <Popover open={showOptions} onOpenChange={setShowOptions}>
          <PopoverTrigger asChild>
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="h-10 w-10"
              disabled={disabled}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4" align="end">
            <div className="space-y-2">
              <h4 className="font-medium">Search in fields</h4>
              <div className="space-y-1">
                {fields.map(field => (
                  <label 
                    key={field.value} 
                    className="flex items-center space-x-2"
                  >
                    <input 
                      type="checkbox"
                      checked={field.checked}
                      onChange={() => toggleField(field.value)}
                      className="rounded"
                    />
                    <span>{field.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {advancedOptions}
          </PopoverContent>
        </Popover>
      )}
      
      {showFilterButton && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onFilterClick}
          className="flex items-center gap-1"
          disabled={disabled}
        >
          <span>{!isMobile && "Filters"}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      )}
      
      {showSearchButton && (
        <Button 
          type="submit" 
          disabled={disabled}
          className="flex items-center gap-2"
        >
          <Search className="h-4 w-4" />
          {!isMobile && searchButtonText}
        </Button>
      )}
    </form>
  );
}
