
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Member } from "@/types/member";
import { motion } from "framer-motion";

interface AdvancedSearchProps {
  onFieldsChange?: (fields: Array<keyof Member>) => void;
  onCaseSensitiveChange?: (caseSensitive: boolean) => void;
  selectedFields?: Array<keyof Member>;
  caseSensitive?: boolean;
  onClose?: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const AdvancedSearch = ({
  onFieldsChange = () => {},
  onCaseSensitiveChange = () => {},
  selectedFields = ['name', 'email', 'role'],
  caseSensitive = false,
  onClose = () => {},
  searchQuery = "",
  onSearchChange = () => {},
}: AdvancedSearchProps) => {
  const [localFields, setLocalFields] = useState<Array<keyof Member>>(selectedFields);
  const [localCaseSensitive, setLocalCaseSensitive] = useState<boolean>(caseSensitive);
  
  useEffect(() => {
    setLocalFields(selectedFields || ['name', 'email', 'role']);
    setLocalCaseSensitive(caseSensitive);
  }, [selectedFields, caseSensitive]);

  const toggleField = (field: keyof Member) => {
    setLocalFields(prev => {
      const updatedFields = [...prev];
      if (updatedFields.includes(field)) {
        return updatedFields.filter(f => f !== field);
      } else {
        return [...updatedFields, field];
      }
    });
  };

  const applyChanges = () => {
    onFieldsChange(localFields);
    onCaseSensitiveChange(localCaseSensitive);
  };

  const fields: Array<{id: keyof Member, label: string}> = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'status', label: 'Status' },
    { id: 'type', label: 'Member Type' },
    { id: 'joinDate', label: 'Join Date' },
    { id: 'paymentMethod', label: 'Payment Method' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="mb-4"
    >
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium">Advanced Search Options</h3>
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Separator className="mb-3" />
          
          <div className="space-y-3">
            <div>
              <h4 className="text-xs font-medium mb-2">Search in fields:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {fields.map(field => (
                  <div key={field.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`field-${field.id}`} 
                      checked={localFields.includes(field.id)}
                      onCheckedChange={() => toggleField(field.id)}
                    />
                    <Label 
                      htmlFor={`field-${field.id}`}
                      className="text-xs cursor-pointer"
                    >
                      {field.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="case-sensitive"
                checked={localCaseSensitive}
                onCheckedChange={() => setLocalCaseSensitive(!localCaseSensitive)}
              />
              <Label 
                htmlFor="case-sensitive"
                className="text-xs cursor-pointer"
              >
                Case sensitive search
              </Label>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>Tips:</p>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li>Use quotes for exact matches: "John Doe"</li>
                <li>Multiple words will search for members matching all terms</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button 
                size="sm" 
                onClick={applyChanges}
                className="text-xs"
              >
                Apply
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
