import { Filter, PlusCircle, Upload, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MemberImport } from "@/components/member/MemberImport";
import { MemberSearchBar } from "@/components/member/MemberSearchBar"; 
import { MemberFilters } from "@/components/member/MemberFilters";
import { ActiveFilterTags } from "@/components/member/ActiveFilterTags";
import { FilterOptions } from "@/types/table";
import { useState, useEffect } from "react";

interface MemberSearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  onAddMember: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
  viewMode?: "grid" | "list";
}

export const MemberSearchAndFilter = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onAddMember,
  onFileUpload,
  onViewModeChange,
  viewMode = "list"
}: MemberSearchAndFilterProps) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: statusFilter,
    type: typeFilter,
    role: "all",
    paymentMethod: "all"
  });

  const activeFilterCount = Object.values(filterOptions).filter(value => value !== "all").length;

  useEffect(() => {
    setFilterOptions(prev => ({
      ...prev,
      status: statusFilter,
      type: typeFilter
    }));
  }, [statusFilter, typeFilter]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilterOptions(newFilters);
    onStatusFilterChange(newFilters.status);
    onTypeFilterChange(newFilters.type);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      status: "all",
      type: "all",
      role: "all",
      paymentMethod: "all"
    };
    setFilterOptions(resetFilters);
    onStatusFilterChange("all");
    onTypeFilterChange("all");
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center">
        <MemberSearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
        <div className="flex gap-2 w-full sm:w-auto">
          <MemberFilters
            filterOptions={filterOptions}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
          />
          
          {onViewModeChange && (
            <div className="flex rounded-md border border-input overflow-hidden">
              <Button 
                variant={viewMode === "grid" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none border-0"
                onClick={() => onViewModeChange("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={viewMode === "list" ? "default" : "ghost"} 
                size="sm" 
                className="rounded-none border-0"
                onClick={() => onViewModeChange("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <Button variant="outline" onClick={onAddMember}>
            <PlusCircle className="h-4 w-4 mr-2" /> 
            Add Member
          </Button>
          <MemberImport onFileUpload={onFileUpload} />
        </div>
      </div>
      
      <ActiveFilterTags
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />
    </div>
  );
};
