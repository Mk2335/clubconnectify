
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const DashboardSearch = ({ onSearch, placeholder = "Search..." }: DashboardSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};
