import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useCallback, useMemo, useState } from "react";
import { Member, MemberListProps } from "@/types/member";
import { Edit, Trash, UserX, ArrowUpDown } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Member;
    direction: 'asc' | 'desc';
  } | null>(null);

  const members: Member[] = useMemo(() => [
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
  ], []);

  const getStatusColor = useCallback((status: Member["status"]) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs font-medium";
      case "Inactive":
        return "text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs font-medium";
      case "Pending":
        return "text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full text-xs font-medium";
      default:
        return "";
    }
  }, []);

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="w-[200px] cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('name')}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('email')}
            >
              Email
              <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead 
              className="w-[100px] cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('status')}
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead 
              className="w-[150px] cursor-pointer hover:bg-muted/50"
              onClick={() => handleSort('joinDate')}
            >
              Join Date
              <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
            </TableHead>
            <TableHead className="w-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredMembers.map((member) => (
            <TableRow key={member.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <span className={getStatusColor(member.status)}>
                  {member.status}
                </span>
              </TableCell>
              <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(member.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeactivate(member.id)}
                  >
                    <UserX className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(member.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {sortedAndFilteredMembers.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                No members found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};