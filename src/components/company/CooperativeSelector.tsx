
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Check } from "lucide-react";

const cooperatives = [
  { id: 1, name: "Wohnbaugenossenschaft 1" },
  { id: 2, name: "Dienstleistungsgenossenschaft 2" },
  { id: 3, name: "Agrargenossenschaft 3" },
  { id: 4, name: "Stiftung" },
];

export function CooperativeSelector() {
  const [selectedCooperative, setSelectedCooperative] = useState("1");

  return (
    <div className="flex items-center gap-2 p-4 border-b">
      <Building2 className="h-4 w-4 text-muted-foreground" />
      <Select 
        value={selectedCooperative} 
        onValueChange={setSelectedCooperative}
      >
        <SelectTrigger className="w-[280px] bg-background border-none focus:ring-0">
          <SelectValue placeholder="Wähle eine Genossenschaft" />
        </SelectTrigger>
        <SelectContent className="bg-black border-gray-800 rounded-lg">
          {cooperatives.map((coop) => (
            <SelectItem 
              key={coop.id} 
              value={coop.id.toString()} 
              className="text-white hover:bg-gray-800 focus:bg-gray-800 rounded"
            >
              <div className="flex items-center">
                {selectedCooperative === coop.id.toString() && (
                  <Check className="mr-2 h-4 w-4 text-white" />
                )}
                {coop.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
