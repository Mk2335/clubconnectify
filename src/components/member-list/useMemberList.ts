
import { useState, useMemo, useCallback } from "react";
import { Member } from "@/types/member";
import { SortConfig } from "@/types/table";
import { MEMBER_STATUS, TOAST_MESSAGES } from "@/constants/memberConstants";
import { toast } from "@/components/ui/use-toast";
import { validateMemberData } from "@/utils/memberUtils";

export const useMemberList = (initialMembers: Member[]) => {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "communication">("list");

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
  }, [sortedAndFilteredMembers]);

  /**
   * Check if all members are selected
   */
  const allSelected = useMemo(() => {
    return sortedAndFilteredMembers.length > 0 && 
      sortedAndFilteredMembers.every(member => selectedMembers.includes(member.id));
  }, [selectedMembers, sortedAndFilteredMembers]);

  /**
   * Handle bulk email action
   */
  const handleBulkEmail = useCallback(() => {
    setActiveTab("communication");
  }, []);

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
              type: "Individual"
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

  return {
    members,
    sortedAndFilteredMembers,
    sortConfig,
    setSortConfig,
    localSearchQuery,
    setLocalSearchQuery,
    statusFilter, 
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    selectedMembers,
    setSelectedMembers,
    activeTab,
    setActiveTab,
    handleSort,
    handleEdit,
    handleDelete,
    handleDeactivate,
    handleAddMember,
    toggleMemberSelection,
    toggleAllMembers,
    allSelected,
    handleBulkEmail,
    handleBulkDeactivate,
    handleBulkDelete,
    handleFileUpload
  };
};
