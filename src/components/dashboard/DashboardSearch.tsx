import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

interface DashboardSearchProps {
  onSearch: (query: string) => void;
}

export const DashboardSearch = ({ onSearch }: DashboardSearchProps) => {
  const { toast } = useToast();

  const handleFilter = useCallback(() => {
    toast({
      title: "Coming Soon",
      description: "Advanced filtering options will be available soon.",
    });
  }, [toast]);

  const handleExport = useCallback(() => {
    toast({
      title: "Coming Soon",
      description: "Export functionality will be available soon.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search members..."
          className="pl-9"
          type="search"
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search members"
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleFilter}
        >
          Filter
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleExport}
        >
          Export
        </Button>
      </div>
    </div>
  );
};