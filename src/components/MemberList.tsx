/**
 * Main component for managing and displaying member data
 * Handles member listing, importing, sorting, and filtering functionality
 */

import { useCallback, useMemo, useState } from "react";
import { Member, MemberListProps } from "@/types/member";
import { toast } from "@/components/ui/use-toast";
import { MemberTable } from "./member/MemberTable";
import { MemberImport } from "./member/MemberImport";
import { SortConfig } from "@/types/table";
import { validateMemberData } from "@/utils/memberUtils";
import { MEMBER_STATUS, TOAST_MESSAGES } from "@/constants/memberConstants";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: MEMBER_STATUS.ACTIVE,
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: MEMBER_STATUS.ACTIVE,
      joinDate: "2024-02-01",
    },
  ]);

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

  if (!members.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No members found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <MemberImport onFileUpload={handleFileUpload} />
      </div>

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
    </div>
  );
};