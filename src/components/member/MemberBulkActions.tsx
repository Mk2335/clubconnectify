
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Trash2, UserX, Download, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface MemberBulkActionsProps {
  selectedCount: number;
  allSelected: boolean;
  onToggleAll: (selected: boolean) => void;
  onEmail: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
  onExport?: () => void;
}

export const MemberBulkActions = ({
  selectedCount,
  allSelected,
  onToggleAll,
  onEmail,
  onDeactivate,
  onDelete,
  onExport
}: MemberBulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-muted p-2 rounded-md flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Checkbox 
          checked={allSelected} 
          onCheckedChange={(checked) => onToggleAll(!!checked)} 
        />
        <span className="text-sm font-medium">{selectedCount} members selected</span>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEmail}
          className="flex items-center gap-1"
        >
          <Mail className="h-4 w-4" />
          <span className="hidden md:inline">Email</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDeactivate}
          className="flex items-center gap-1"
        >
          <UserX className="h-4 w-4" />
          <span className="hidden md:inline">Deactivate</span>
        </Button>
        
        {onExport && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onExport}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden md:inline">Export</span>
          </Button>
        )}
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden md:inline">Delete</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-8 w-8 md:hidden">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onEmail}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeactivate}>
              <UserX className="mr-2 h-4 w-4" />
              <span>Deactivate</span>
            </DropdownMenuItem>
            {onExport && (
              <DropdownMenuItem onClick={onExport}>
                <Download className="mr-2 h-4 w-4" />
                <span>Export</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem className="text-red-600" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
