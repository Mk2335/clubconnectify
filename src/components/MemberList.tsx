
/**
 * Main component for managing and displaying member data
 * Handles member listing, importing, sorting, and filtering functionality
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import { Member, MemberListProps } from "@/types/member";
import { toast } from "@/components/ui/use-toast";
import { MemberTable } from "./member/MemberTable";
import { MemberImport } from "./member/MemberImport";
import { SortConfig } from "@/types/table";
import { validateMemberData } from "@/utils/memberUtils";
import { MEMBER_STATUS, TOAST_MESSAGES } from "@/constants/memberConstants";
import { supabase } from "@/integrations/supabase/client";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('address_book')
        .select('*');
      
      if (error) throw error;
      
      const mappedData = data.map((item): Member => ({
        id: item.id,
        name: `${item.first_name} ${item.last_name}`,
        email: item.email,
        status: item.status as Member['status'],
        joinDate: new Date(item.created_at).toISOString().split('T')[0],
        // Additional fields for reference
        firstName: item.first_name,
        lastName: item.last_name,
        street: item.street,
        city: item.city,
        zipCode: item.zip_code
      }));
      
      setMembers(mappedData);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: "Error",
        description: "Failed to load members. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
        
        const newMembers = lines.slice(1)
          .filter(line => line.trim() !== '')
          .map((line) => {
            const values = line.split(',');
            return {
              first_name: values[0]?.trim() || '',
              last_name: values[1]?.trim() || '',
              email: values[2]?.trim() || '',
              phone: values[3]?.trim() || '',
              street: values[4]?.trim() || '',
              additional_address: values[5]?.trim() || '',
              zip_code: values[6]?.trim() || '',
              city: values[7]?.trim() || '',
              status: 'Active'
            };
          })
          .filter(member => member.first_name && member.last_name && member.email);

        if (newMembers.length > 0) {
          try {
            const { error } = await supabase
              .from('address_book')
              .insert(newMembers);
              
            if (error) throw error;
            
            toast({
              title: "Import Successful",
              description: TOAST_MESSAGES.IMPORT_SUCCESS,
            });
            
            fetchMembers(); // Refresh the list
          } catch (error) {
            console.error('Error inserting members:', error);
            toast({
              title: "Import Failed",
              description: TOAST_MESSAGES.IMPORT_ERROR,
              variant: "destructive",
            });
          }
        }
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
  const handleDelete = useCallback(async (memberId: string) => {
    try {
      const { error } = await supabase
        .from('address_book')
        .delete()
        .eq('id', memberId);
        
      if (error) throw error;
      
      setMembers(prev => prev.filter(member => member.id !== memberId));
      
      toast({
        title: "Delete Member",
        description: TOAST_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: "Delete Failed",
        description: "There was a problem deleting the member. Please try again.",
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
        .from('address_book')
        .update({ status: 'Inactive' })
        .eq('id', memberId);
        
      if (error) throw error;
      
      setMembers(prev => prev.map(member => 
        member.id === memberId 
          ? { ...member, status: 'Inactive' as Member['status'] } 
          : member
      ));
      
      toast({
        title: "Deactivate Member",
        description: TOAST_MESSAGES.DEACTIVATE_SUCCESS,
      });
    } catch (error) {
      console.error('Error deactivating member:', error);
      toast({
        title: "Deactivation Failed",
        description: "There was a problem deactivating the member. Please try again.",
        variant: "destructive",
      });
    }
  }, []);

  /**
   * Memoized sorted and filtered members list
   */
  const sortedAndFilteredMembers = useMemo(() => {
    let result = [...members];
    
    if (searchQuery) {
      result = result.filter((member) =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

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
  }, [members, searchQuery, sortConfig]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Address Book</h1>
        <MemberImport onFileUpload={handleFileUpload} />
      </div>

      {!members.length ? (
        <div className="text-center py-8 bg-white rounded-lg border">
          <p className="text-muted-foreground">No members found.</p>
          <p className="mt-2">Import members using the button above or add them manually.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <MemberTable
            members={sortedAndFilteredMembers}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDeactivate={handleDeactivate}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
        </div>
      )}
    </div>
  );
};
