
import { useState, useMemo, useCallback, useEffect } from "react";
import { Member } from "@/types/member";
import { SortConfig } from "@/types/table";
import { MEMBER_STATUS, TOAST_MESSAGES } from "@/constants/memberConstants";
import { toast } from "@/components/ui/use-toast";
import { validateMemberData } from "@/utils/memberUtils";
import { supabase } from "@/integrations/supabase/client";

export const useMemberList = (initialMembers: Member[] = []) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "communication">("list");

  // Fetch members from Supabase
  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('members')
        .select(`
          *,
          company_details(*)
        `);

      if (error) {
        throw error;
      }

      // Transform data to match our Member type
      const transformedMembers: Member[] = data.map((item: any) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        status: item.status,
        joinDate: item.join_date,
        profilePicture: item.profile_picture || "",
        role: item.role,
        paymentMethod: item.payment_method,
        type: item.type,
        companyDetails: item.company_details ? {
          companyName: item.company_details.company_name,
          registrationNumber: item.company_details.registration_number || "",
          contactPerson: item.company_details.contact_person || ""
        } : undefined
      }));

      setMembers(transformedMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: "Error",
        description: "Failed to fetch members",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchMembers();
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
  const handleEdit = useCallback(async (memberId: string) => {
    // In a real app, this would open a modal for editing
    // For now, we'll just show a toast
    toast({
      title: "Edit Member",
      description: TOAST_MESSAGES.EDIT_SUCCESS,
    });
  }, []);

  /**
   * Handles member deletion
   */
  const handleDelete = useCallback(async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', memberId);
      
      if (error) throw error;

      // Update local state
      setMembers(prev => prev.filter(member => member.id !== memberId));
      
      toast({
        title: "Delete Member",
        description: TOAST_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: "Error",
        description: "Failed to delete member",
        variant: "destructive",
      });
    }
  }, []);

  /**
   * Handles member deactivation
   */
  const handleDeactivate = useCallback(async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('members')
        .update({ status: MEMBER_STATUS.INACTIVE })
        .eq('id', memberId);
      
      if (error) throw error;

      // Update local state
      setMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, status: MEMBER_STATUS.INACTIVE } 
          : member
      ));
      
      toast({
        title: "Deactivate Member",
        description: TOAST_MESSAGES.DEACTIVATE_SUCCESS,
      });
    } catch (error) {
      console.error('Error deactivating member:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate member",
        variant: "destructive",
      });
    }
  }, []);

  /**
   * Handles adding a new member
   */
  const handleAddMember = useCallback(() => {
    // In a real app, this would open a modal for adding a new member
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
  const handleBulkDeactivate = useCallback(async () => {
    try {
      // Update each member in Supabase
      for (const memberId of selectedMembers) {
        const { error } = await supabase
          .from('members')
          .update({ status: MEMBER_STATUS.INACTIVE })
          .eq('id', memberId);
        
        if (error) throw error;
      }

      // Update local state
      setMembers(prev => prev.map(member => 
        selectedMembers.includes(member.id) 
          ? { ...member, status: MEMBER_STATUS.INACTIVE } 
          : member
      ));
      
      toast({
        title: "Deactivate Members",
        description: `${selectedMembers.length} members have been deactivated.`,
      });
      
      // Clear selection
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error deactivating members:', error);
      toast({
        title: "Error",
        description: "Failed to deactivate members",
        variant: "destructive",
      });
    }
  }, [selectedMembers]);

  /**
   * Handle bulk deletion
   */
  const handleBulkDelete = useCallback(async () => {
    try {
      // Delete each member in Supabase
      for (const memberId of selectedMembers) {
        const { error } = await supabase
          .from('members')
          .delete()
          .eq('id', memberId);
        
        if (error) throw error;
      }

      // Update local state
      setMembers(prev => prev.filter(member => !selectedMembers.includes(member.id)));
      
      toast({
        title: "Delete Members",
        description: `${selectedMembers.length} members have been deleted.`,
      });
      
      // Clear selection
      setSelectedMembers([]);
    } catch (error) {
      console.error('Error deleting members:', error);
      toast({
        title: "Error",
        description: "Failed to delete members",
        variant: "destructive",
      });
    }
  }, [selectedMembers]);

  /**
   * Handles CSV file upload and member data import
   */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        // Parse CSV and create members
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',');
          if (!values[0]?.trim()) continue; // Skip empty lines
          
          const memberData: Partial<Member> = {
            name: values[0]?.trim() || '',
            email: values[1]?.trim() || '',
            status: MEMBER_STATUS.ACTIVE as Member['status'],
            type: "Individual"
          };

          if (!validateMemberData(memberData as Member)) continue;

          // Insert into Supabase
          const { data, error } = await supabase
            .from('members')
            .insert({
              name: memberData.name,
              email: memberData.email,
              status: memberData.status,
              type: memberData.type
            })
            .select();
          
          if (error) throw error;
        }

        // Refresh member list
        fetchMembers();
        
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
    loading,
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
    handleFileUpload,
    fetchMembers
  };
};
