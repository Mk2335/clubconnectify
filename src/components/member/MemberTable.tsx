import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, UserX, ArrowUpDown } from "lucide-react";
import { Member } from "@/types/member";
import { MemberTableProps } from "@/types/table";
import { useCallback } from "react";

export const MemberTable = ({ 
  members, 
  onEdit, 
  onDelete, 
  onDeactivate, 
  sortConfig, 
  onSort 
}: MemberTableProps) => {
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

  if (members.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
          No members found matching your search.
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="w-[200px] cursor-pointer hover:bg-muted/50"
            onClick={() => onSort('name')}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onSort('email')}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
          </TableHead>
          <TableHead 
            className="w-[100px] cursor-pointer hover:bg-muted/50"
            onClick={() => onSort('status')}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
          </TableHead>
          <TableHead 
            className="w-[150px] cursor-pointer hover:bg-muted/50"
            onClick={() => onSort('joinDate')}
          >
            Join Date
            <ArrowUpDown className="ml-2 h-4 w-4 inline-block" />
          </TableHead>
          <TableHead className="w-[200px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
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
                  onClick={() => onEdit(member.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeactivate(member.id)}
                >
                  <UserX className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => onDelete(member.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};