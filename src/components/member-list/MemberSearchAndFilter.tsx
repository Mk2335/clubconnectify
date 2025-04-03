
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MemberActionsToolbar } from "@/components/member/MemberActionsToolbar";
import { RefreshCw, Grid3X3, List, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Member } from "@/types/member";
import { AdvancedSearch } from "./AdvancedSearch";

interface MemberSearchAndFilterProps {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  viewMode?: "grid" | "list";
  searchFields?: Array<keyof Member>;
  caseSensitive?: boolean;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onAddMember: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onViewModeChange?: (mode: "grid" | "list") => void;
  onSearchFieldsChange?: (fields: Array<keyof Member>) => void;
  onCaseSensitiveChange?: (value: boolean) => void;
  onExport?: () => void;
}

export const MemberSearchAndFilter = ({
  searchQuery,
  statusFilter,
  typeFilter,
  viewMode = "list",
  searchFields = ["name", "email", "role"],
  caseSensitive = false,
  onSearchChange,
  onStatusFilterChange,
  onTypeFilterChange,
  onAddMember,
  onFileUpload,
  onViewModeChange,
  onSearchFieldsChange,
  onCaseSensitiveChange,
  onExport
}: MemberSearchAndFilterProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1 sm:max-w-md">
          <div className="relative flex-1">
            <AdvancedSearch
              searchQuery={searchQuery}
              onSearchChange={onSearchChange}
              searchFields={searchFields}
              caseSensitive={caseSensitive}
              onSearchFieldsChange={onSearchFieldsChange}
              onCaseSensitiveChange={onCaseSensitiveChange}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-between sm:justify-end">
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={onTypeFilterChange}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() => onViewModeChange?.(viewMode === "grid" ? "list" : "grid")}
              className="hidden sm:flex"
              title={viewMode === "grid" ? "List View" : "Grid View"}
            >
              {viewMode === "grid" ? (
                <List className="h-4 w-4" />
              ) : (
                <Grid3X3 className="h-4 w-4" />
              )}
            </Button>

            {onExport && (
              <Button
                variant="outline"
                size="icon"
                onClick={onExport}
                className="hidden sm:flex"
                title="Export Members"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>

          <MemberActionsToolbar
            onAddMember={onAddMember}
            onFileUpload={onFileUpload}
            onExport={onExport}
          />
        </div>
      </div>
    </div>
  );
};
