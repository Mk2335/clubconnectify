
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Trash2, UserX } from "lucide-react";

interface MemberBulkActionsProps {
  selectedCount: number;
  allSelected: boolean;
  onToggleAll: (selected: boolean) => void;
  onEmail: () => void;
  onDeactivate: () => void;
  onDelete: () => void;
}

export const MemberBulkActions = ({
  selectedCount,
  allSelected,
  onToggleAll,
  onEmail,
  onDeactivate,
  onDelete
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDelete}
          className="flex items-center gap-1 text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden md:inline">Delete</span>
        </Button>
      </div>
    </div>
  );
};
