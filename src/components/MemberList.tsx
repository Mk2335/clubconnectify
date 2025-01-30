import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Member {
  id: string;
  name: string;
  email: string;
  status: string;
  joinDate: string;
}

interface MemberListProps {
  searchQuery?: string;
}

export const MemberList = ({ searchQuery = "" }: MemberListProps) => {
  // This is dummy data - in a real application, this would come from an API
  const members: Member[] = [
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
  ];

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.status}</TableCell>
            <TableCell>{member.joinDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};