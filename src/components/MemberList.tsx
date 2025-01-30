import { useCallback, useMemo, useState } from "react";
import { Member, MemberListProps } from "@/types/member";
import { toast } from "@/components/ui/use-toast";
import { MemberTable } from "./member/MemberTable";
import { MemberImport } from "./member/MemberImport";
import { SortConfig } from "@/types/table";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Active",
      joinDate: "2024-02-01",
    },
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        const newMembers: Member[] = lines.slice(1).map((line, index) => {
          const values = line.split(',');
          return {
            id: (members.length + index + 1).toString(),
            name: values[0]?.trim() || '',
            email: values[1]?.trim() || '',
            status: "Active" as const,
            joinDate: new Date().toISOString().split('T')[0],
          };
        }).filter(member => member.name && member.email);

        setMembers(prev => [...prev, ...newMembers]);
        toast({
          title: "Import Successful",
          description: `${newMembers.length} members have been imported.`,
        });
      } catch (error) {
        toast({
          title: "Import Failed",
          description: "Please check your CSV file format.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  const handleSort = (key: keyof Member) => {
    setSortConfig((currentSort) => {
      if (currentSort?.key === key) {
        return {
          key,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key, direction: 'asc' };
    });
  };

  const handleEdit = (memberId: string) => {
    toast({
      title: "Edit Member",
      description: `Editing member ${memberId}`,
    });
  };

  const handleDelete = (memberId: string) => {
    toast({
      title: "Delete Member",
      description: `Deleting member ${memberId}`,
      variant: "destructive",
    });
  };

  const handleDeactivate = (memberId: string) => {
    toast({
      title: "Deactivate Member",
      description: `Deactivating member ${memberId}`,
      variant: "destructive",
    });
  };

  const sortedAndFilteredMembers = useMemo(() => {
    let result = [...members];
    
    // Apply search filter
    result = result.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

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