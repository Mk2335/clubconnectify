import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCallback, useMemo } from "react";

interface Member {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  joinDate: string;
}

interface MemberListProps {
  searchQuery?: string;
}

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  // This is dummy data - in a real application, this would come from an API
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
        return "text-green-600";
      case "Inactive":
        return "text-red-600";
      case "Pending":
        return "text-yellow-600";
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
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Join Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMembers.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell className={getStatusColor(member.status)}>
                {member.status}
              </TableCell>
              <TableCell>{member.joinDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};