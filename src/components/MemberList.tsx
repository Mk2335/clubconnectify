import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCallback, useMemo } from "react";
import { Member, MemberListProps } from "@/types/member";

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
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

  const filteredMembers = useMemo(() => 
    members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [members, searchQuery]
  );

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
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[150px]">Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow key={member.id} className="hover:bg-muted/50 transition-colors">
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>
                <span className={getStatusColor(member.status)}>
                  {member.status}
                </span>
              </TableCell>
              <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {filteredMembers.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                No members found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};