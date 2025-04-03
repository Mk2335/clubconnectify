
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FilterOptions } from "@/types/table";

interface ActiveFilterTagsProps {
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const ActiveFilterTags = ({
  filterOptions,
  onFilterChange,
  onResetFilters,
  activeFilterCount
}: ActiveFilterTagsProps) => {
  if (activeFilterCount === 0) return null;
  
  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filterOptions, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center text-sm mb-4">
      <span className="text-muted-foreground">Active filters:</span>
      {filterOptions.status !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
          Status: {filterOptions.status}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('status', 'all')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      {filterOptions.type !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
          Type: {filterOptions.type}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('type', 'all')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      {filterOptions.role !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
          Role: {filterOptions.role}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('role', 'all')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      {filterOptions.paymentMethod !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1 py-1 px-2">
          Payment: {filterOptions.paymentMethod}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('paymentMethod', 'all')}
          >
            <X className="h-3 w-3" />
          </Button>
        </Badge>
      )}
      {activeFilterCount > 1 && (
        <Button variant="ghost" size="sm" onClick={onResetFilters} className="text-xs h-7">
          Clear all
        </Button>
      )}
    </div>
  );
};
