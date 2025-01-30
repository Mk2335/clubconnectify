/**
 * Component for handling member data import via CSV
 * Provides file upload functionality with validation and user feedback
 */

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
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { TOAST_MESSAGES } from "@/constants/memberConstants";

interface MemberImportProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MemberImport = ({ onFileUpload }: MemberImportProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    if (file.type !== "text/csv") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    onFileUpload(event);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            Make sure your CSV file is properly formatted with headers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="cursor-pointer file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm 
                     file:font-semibold file:bg-primary 
                     file:text-primary-foreground hover:file:bg-primary/90"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Maximum file size: 5MB
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};