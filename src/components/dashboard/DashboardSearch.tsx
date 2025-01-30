import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DashboardSearchProps {
  onSearch: (query: string) => void;
}

export const DashboardSearch = ({ onSearch }: DashboardSearchProps) => {
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
        <Button variant="outline" size="sm">
          Filter
        </Button>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
    </div>
  );
};