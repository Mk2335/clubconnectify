/**
 * Component for displaying member data in a table format
 * Provides sorting, filtering, and member management actions
 */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash, UserX, ArrowUpDown } from "lucide-react";
import { Member } from "@/types/member";
import { MemberTableProps } from "@/types/table";
import { formatDate, getStatusBadgeClass } from "@/utils/memberUtils";
import { TABLE_HEADERS } from "@/constants/memberConstants";

/**
 * MemberTable component displays member data in a sortable table format
 * @param members - Array of member objects to display
 * @param onEdit - Callback function for editing a member
 * @param onDelete - Callback function for deleting a member
 * @param onDeactivate - Callback function for deactivating a member
 * @param sortConfig - Current sort configuration
 * @param onSort - Callback function for handling sort changes
 */
export const MemberTable = ({ 
  members, 
  onEdit, 
  onDelete, 
  onDeactivate, 
  sortConfig, 
  onSort 
}: MemberTableProps) => {
  // Early return if no members are found
  if (members.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
          No members found matching your search.
        </TableCell>
      </TableRow>
    );
  }

  /**
   * Renders the sort indicator for table headers
   */
  const renderSortableHeader = (key: keyof Member, label: string) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => onSort(key)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        <ArrowUpDown className="h-4 w-4" />
      </div>
    </TableHead>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {renderSortableHeader('name', TABLE_HEADERS.NAME)}
          {renderSortableHeader('email', TABLE_HEADERS.EMAIL)}
          {renderSortableHeader('status', TABLE_HEADERS.STATUS)}
          {renderSortableHeader('joinDate', TABLE_HEADERS.JOIN_DATE)}
          <TableHead className="w-[200px]">{TABLE_HEADERS.ACTIONS}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id} className="hover:bg-muted/50 transition-colors">
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>
              <span className={getStatusBadgeClass(member.status)}>
                {member.status}
              </span>
            </TableCell>
            <TableCell>{formatDate(member.joinDate)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(member.id)}
                  title="Edit member"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeactivate(member.id)}
                  title="Deactivate member"
                >
                  <UserX className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => onDelete(member.id)}
                  title="Delete member"
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