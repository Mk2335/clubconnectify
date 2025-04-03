
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowDownToLine, Upload, Download } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MemberImport } from "./MemberImport";

interface MemberActionsToolbarProps {
  onAddMember: () => void;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExport?: () => void;
}

export const MemberActionsToolbar = ({
  onAddMember,
  onFileUpload,
  onExport
}: MemberActionsToolbarProps) => {
  return (
    <div className="flex gap-2 w-full sm:w-auto">
      <Button variant="outline" onClick={onAddMember} size="sm" className="flex items-center gap-1">
        <PlusCircle className="h-4 w-4" /> 
        <span className="hidden md:inline">Add Member</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ArrowDownToLine className="h-4 w-4" />
            <span className="hidden md:inline">Import/Export</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <MemberImport onFileUpload={onFileUpload}>
            <DropdownMenuItem>
              <Upload className="mr-2 h-4 w-4" />
              <span>Import Members</span>
            </DropdownMenuItem>
          </MemberImport>
          {onExport && (
            <DropdownMenuItem onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              <span>Export Members</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
