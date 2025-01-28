import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FormProgress from "@/components/audit/FormProgress";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
}

interface ChecklistSection {
  title: string;
  icon: LucideIcon;
  items: ChecklistItem[];
}

export const DocumentChecklistTab = ({ sections }: { sections: ChecklistSection[] }) => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const calculateProgress = () => {
    const totalItems = sections.reduce((acc, section) => acc + section.items.length, 0);
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    return Math.round((checkedCount / totalItems) * 100);
  };

  const handleCheckboxChange = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <div className="mt-6 space-y-8">
      <FormProgress progress={calculateProgress()} />
      <div className="space-y-8">
        {sections.map((section) => (
          <Card key={section.title} className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">{section.title}</h2>
            </div>
            <div className="space-y-4">
              {section.items.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`checkbox-${item.id}`} 
                        checked={checkedItems[item.id] || false}
                        onCheckedChange={() => handleCheckboxChange(item.id)}
                      />
                      <Label htmlFor={item.id}>{item.label}</Label>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <Select>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex-1">
                        <Input
                          id={item.id}
                          type="file"
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};