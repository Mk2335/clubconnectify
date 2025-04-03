
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Member } from "@/types/member";
import { MemberTableProps } from "@/types/table";
import { HighlightedText } from "../member-list/SearchUtils";

export const MemberTable = ({
  members,
  onEdit,
  onDelete,
  onDeactivate,
  sortConfig,
  onSort,
  selectedMembers,
  toggleMemberSelection,
  toggleAllMembers,
  allSelected,
  searchQuery = ""
}: MemberTableProps) => {
  const getSortIndicator = (key: keyof Member) => {
    if (sortConfig?.key !== key) return null;
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4" />
    );
  };

  const handleHeaderClick = (key: keyof Member) => {
    onSort(key);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected && members.length > 0}
                onCheckedChange={toggleAllMembers}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleHeaderClick("name")}
            >
              <div className="flex items-center">
                Name {getSortIndicator("name")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleHeaderClick("email")}
            >
              <div className="flex items-center">
                Email {getSortIndicator("email")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleHeaderClick("status")}
            >
              <div className="flex items-center">
                Status {getSortIndicator("status")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleHeaderClick("role")}
            >
              <div className="flex items-center">
                Role {getSortIndicator("role")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleHeaderClick("type")}
            >
              <div className="flex items-center">
                Type {getSortIndicator("type")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer" 
              onClick={() => handleHeaderClick("joinDate")}
            >
              <div className="flex items-center">
                Join Date {getSortIndicator("joinDate")}
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No members found.
              </TableCell>
            </TableRow>
          ) : (
            members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedMembers.includes(member.id)}
                    onCheckedChange={() => toggleMemberSelection(member.id)}
                    aria-label={`Select ${member.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {searchQuery ? (
                    <HighlightedText text={member.name} searchQuery={searchQuery} />
                  ) : (
                    member.name
                  )}
                </TableCell>
                <TableCell>
                  {searchQuery ? (
                    <HighlightedText text={member.email} searchQuery={searchQuery} />
                  ) : (
                    member.email
                  )}
                </TableCell>
                <TableCell>
                  <span className="flex items-center">
                    <span
                      className={`mr-1.5 h-2 w-2 rounded-full ${
                        member.status === "Active"
                          ? "bg-green-500"
                          : member.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    />
                    {member.status}
                  </span>
                </TableCell>
                <TableCell>
                  {searchQuery && member.role ? (
                    <HighlightedText text={member.role} searchQuery={searchQuery} />
                  ) : (
                    member.role || "-"
                  )}
                </TableCell>
                <TableCell>{member.type}</TableCell>
                <TableCell>
                  {new Date(member.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(member.id)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeactivate(member.id)}>
                        {member.status === "Active" ? "Deactivate" : "Activate"}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete(member.id)}
                        className="text-destructive"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
