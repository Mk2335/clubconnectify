
import { Input } from "@/components/ui/input";
import { Filter, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberImport } from "@/components/member/MemberImport";

interface MemberSearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  onAddMember: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MemberSearchAndFilter = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  onAddMember,
  onFileUpload
}: MemberSearchAndFilterProps) => {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center">
      <div className="w-full sm:w-auto flex-1 max-w-md">
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <div className="flex items-center gap-2 flex-1 sm:flex-auto">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Select value={typeFilter} onValueChange={onTypeFilterChange}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Individual">Individual</SelectItem>
            <SelectItem value="Company">Company</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={onAddMember}>
          <PlusCircle className="h-4 w-4 mr-2" /> 
          Add Member
        </Button>
        <MemberImport onFileUpload={onFileUpload} />
      </div>
    </div>
  );
};
