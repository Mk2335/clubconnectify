
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";

const cooperatives = [
  { id: 1, name: "Wohnbaugenossenschaft 1" },
  { id: 2, name: "Dienstleistungsgenossenschaft 2" },
  { id: 3, name: "Agrargenossenschaft 3" },
  { id: 4, name: "Stiftung" },
];

export function CooperativeSelector() {
  return (
    <div className="flex items-center gap-2 p-4 border-b">
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <Select defaultValue="1">
        <SelectTrigger className="w-[240px] bg-background">
          <SelectValue placeholder="Wähle eine Genossenschaft" />
        </SelectTrigger>
        <SelectContent>
          {cooperatives.map((coop) => (
            <SelectItem key={coop.id} value={coop.id.toString()}>
              {coop.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
