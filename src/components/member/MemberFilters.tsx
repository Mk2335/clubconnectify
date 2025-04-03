
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { FilterOptions } from "@/types/table";
import { useState } from "react";

interface MemberFiltersProps {
  filterOptions: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

export const MemberFilters = ({
  filterOptions,
  onFilterChange,
  onResetFilters,
  activeFilterCount
}: MemberFiltersProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filterOptions);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onFilterChange(localFilters);
    setIsFilterOpen(false);
  };

  return (
    <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          title="Filter options"
        >
          <Filter className="h-4 w-4" />
          <span className="hidden md:inline">Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">{activeFilterCount}</Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium">Filter Options</h4>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select 
              value={localFilters.status} 
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Member Type</label>
            <Select 
              value={localFilters.type} 
              onValueChange={(value) => handleFilterChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Individual">Individual</SelectItem>
                <SelectItem value="Company">Company</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Member Role</label>
            <Select 
              value={localFilters.role} 
              onValueChange={(value) => handleFilterChange('role', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="AM">Active Member (AM)</SelectItem>
                <SelectItem value="ERW">Adult Member (ERW)</SelectItem>
                <SelectItem value="S">Supporting Member (S)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Method</label>
            <Select 
              value={localFilters.paymentMethod} 
              onValueChange={(value) => handleFilterChange('paymentMethod', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Payment Methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payment Methods</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Direct Debit">Direct Debit</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onResetFilters}
            >
              Reset Filters
            </Button>
            <Button 
              size="sm" 
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
