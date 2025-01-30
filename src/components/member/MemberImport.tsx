import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MemberImportProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MemberImport = ({ onFileUpload }: MemberImportProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Import Members
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Members</DialogTitle>
          <DialogDescription>
            Upload a CSV file with member data. The file should have columns for name and email.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <input
            type="file"
            accept=".csv"
            onChange={onFileUpload}
            className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};