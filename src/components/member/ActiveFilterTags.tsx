
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <div className="flex flex-wrap gap-2 items-center text-sm">
      <span className="text-muted-foreground">Active filters:</span>
      {filterOptions.status !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Status: {filterOptions.status}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('status', 'all')}
          >
            &times;
          </Button>
        </Badge>
      )}
      {filterOptions.type !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Type: {filterOptions.type}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('type', 'all')}
          >
            &times;
          </Button>
        </Badge>
      )}
      {filterOptions.role !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Role: {filterOptions.role}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('role', 'all')}
          >
            &times;
          </Button>
        </Badge>
      )}
      {filterOptions.paymentMethod !== "all" && (
        <Badge variant="outline" className="flex items-center gap-1">
          Payment: {filterOptions.paymentMethod}
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-4 w-4 p-0 ml-1" 
            onClick={() => updateFilter('paymentMethod', 'all')}
          >
            &times;
          </Button>
        </Badge>
      )}
      <Button variant="ghost" size="sm" onClick={onResetFilters} className="text-xs">
        Clear all
      </Button>
    </div>
  );
};
