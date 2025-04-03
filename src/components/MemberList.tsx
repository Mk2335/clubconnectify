
/**
 * Main component for managing and displaying member data
 * Handles member listing, importing, sorting, and filtering functionality
 */

import { useCallback, useMemo, useState } from "react";
import { Member, MemberListProps } from "@/types/member";
import { toast } from "@/components/ui/use-toast";
import { MemberTable } from "./member/MemberTable";
import { SortConfig, FilterOptions } from "@/types/table";
import { validateMemberData } from "@/utils/memberUtils";
import { MEMBER_STATUS, TOAST_MESSAGES } from "@/constants/memberConstants";
import { MemberSearchBar } from "./member/MemberSearchBar";
import { MemberFilters } from "./member/MemberFilters";
import { MemberActionsToolbar } from "./member/MemberActionsToolbar";
import { MemberBulkActions } from "./member/MemberBulkActions";
import { ActiveFilterTags } from "./member/ActiveFilterTags";
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Added the missing import
import { Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { PlusCircle } from "lucide-react";
import { MemberImport } from "./member/MemberImport";
import { BrainCircuit } from "lucide-react";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: MEMBER_STATUS.ACTIVE,
      joinDate: "2024-01-15",
      profilePicture: "",
      role: "AM",
      paymentMethod: "Bank Transfer",
      type: "Individual"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: MEMBER_STATUS.ACTIVE,
      joinDate: "2024-02-01",
      profilePicture: "",
      role: "ERW",
      paymentMethod: "Direct Debit",
      type: "Individual"
    },
    {
      id: "3",
      name: "Acme Corporation",
      email: "info@acme.com",
      status: MEMBER_STATUS.ACTIVE,
      joinDate: "2024-03-05",
      profilePicture: "",
      role: "S",
      paymentMethod: "Bank Transfer",
      type: "Company",
      companyDetails: {
        companyName: "Acme Corporation",
        registrationNumber: "AC12345",
        contactPerson: "Robert Johnson"
      }
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      status: MEMBER_STATUS.PENDING,
      joinDate: "2024-04-01",
      profilePicture: "",
      paymentMethod: "Other",
      type: "Individual"
    },
    {
      id: "5",
      name: "Tech Innovators Ltd",
      email: "contact@techinnovators.com",
      status: MEMBER_STATUS.INACTIVE,
      joinDate: "2023-11-15",
      profilePicture: "",
      role: "AM",
      paymentMethod: "Direct Debit",
      type: "Company",
      companyDetails: {
        companyName: "Tech Innovators Ltd",
        registrationNumber: "TI98765",
        contactPerson: "Emma Chen"
      }
    }
  ]);

  /**
   * Toggle selection of a member
   */
  const toggleMemberSelection = useCallback((memberId: string) => {
    setSelectedMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  }, []);

  /**
   * Toggle selection of all members
   */
  const toggleAllMembers = useCallback((selected: boolean) => {
    if (selected) {
      const allMemberIds = sortedAndFilteredMembers.map(member => member.id);
      setSelectedMembers(allMemberIds);
    } else {
      setSelectedMembers([]);
    }
  }, []);

  /**
   * Check if all members are selected
   */
  const allSelected = useMemo(() => {
    return sortedAndFilteredMembers.length > 0 && 
      sortedAndFilteredMembers.every(member => selectedMembers.includes(member.id));
  }, [selectedMembers]);

  /**
   * Handle bulk email action
   */
  const handleBulkEmail = useCallback(() => {
    toast({
      title: "Email Members",
      description: `Email would be sent to ${selectedMembers.length} members.`,
    });
  }, [selectedMembers]);

  /**
   * Handle bulk deactivation
   */
  const handleBulkDeactivate = useCallback(() => {
    toast({
      title: "Deactivate Members",
      description: `${selectedMembers.length} members would be deactivated.`,
      variant: "destructive",
    });
  }, [selectedMembers]);

  /**
   * Handle bulk deletion
   */
  const handleBulkDelete = useCallback(() => {
    toast({
      title: "Delete Members",
      description: `${selectedMembers.length} members would be deleted.`,
      variant: "destructive",
    });
  }, [selectedMembers]);

  /**
   * Handles CSV file upload and member data import
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        const newMembers = lines.slice(1)
          .map((line, index) => {
            const values = line.split(',');
            const memberData: Member = {
              id: (members.length + index + 1).toString(),
              name: values[0]?.trim() || '',
              email: values[1]?.trim() || '',
              status: MEMBER_STATUS.ACTIVE as Member['status'],
              joinDate: new Date().toISOString().split('T')[0],
            };

            return validateMemberData(memberData) ? memberData : null;
          })
          .filter((member): member is Member => member !== null);

        setMembers(prev => [...prev, ...newMembers]);
        toast({
          title: "Import Successful",
          description: TOAST_MESSAGES.IMPORT_SUCCESS,
        });
      } catch (error) {
        console.error('Import error:', error);
        toast({
          title: "Import Failed",
          description: TOAST_MESSAGES.IMPORT_ERROR,
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  /**
   * Handles sorting of member data
   */
  const handleSort = useCallback((key: keyof Member) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === key) {
        return {
          key,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  }, []);

  /**
   * Handles member editing
   */
  const handleEdit = useCallback((memberId: string) => {
    toast({
      title: "Edit Member",
      description: TOAST_MESSAGES.EDIT_SUCCESS,
    });
  }, []);

  /**
   * Handles member deletion
   */
  const handleDelete = useCallback((memberId: string) => {
    toast({
      title: "Delete Member",
      description: TOAST_MESSAGES.DELETE_SUCCESS,
      variant: "destructive",
    });
  }, []);

  /**
   * Handles member deactivation
   */
  const handleDeactivate = useCallback((memberId: string) => {
    toast({
      title: "Deactivate Member",
      description: TOAST_MESSAGES.DEACTIVATE_SUCCESS,
      variant: "destructive",
    });
  }, []);

  /**
   * Handles adding a new member
   */
  const handleAddMember = useCallback(() => {
    toast({
      title: "Add Member",
      description: "The form to add a new member would open here.",
    });
  }, []);

  /**
   * Memoized sorted and filtered members list
   */
  const sortedAndFilteredMembers = useMemo(() => {
    let result = [...members];
    
    // Apply search filter
    if (localSearchQuery) {
      result = result.filter((member) =>
        member.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(localSearchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((member) => member.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((member) => member.type === typeFilter);
    }

    // Apply sorting
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [members, localSearchQuery, sortConfig, statusFilter, typeFilter]);

  if (!members.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No members found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {selectedMembers.length > 0 && (
        <MemberBulkActions
          selectedCount={selectedMembers.length}
          allSelected={allSelected}
          onToggleAll={toggleAllMembers}
          onEmail={handleBulkEmail}
          onDeactivate={handleBulkDeactivate}
          onDelete={handleBulkDelete}
        />
      )}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-between items-start sm:items-center">
        <div className="w-full sm:w-auto flex-1 max-w-md">
          <Input
            placeholder="Search by name or email..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 flex-1 sm:flex-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Individual">Individual</SelectItem>
              <SelectItem value="Company">Company</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleAddMember}>
            <PlusCircle className="h-4 w-4 mr-2" /> 
            Add Member
          </Button>
          <MemberImport onFileUpload={handleFileUpload} />
        </div>
      </div>

      <div className="rounded-md border">
        <MemberTable
          members={sortedAndFilteredMembers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDeactivate={handleDeactivate}
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedMembers={selectedMembers}
          toggleMemberSelection={toggleMemberSelection}
          toggleAllMembers={toggleAllMembers}
          allSelected={allSelected}
        />
      </div>
    </div>
  );
};
