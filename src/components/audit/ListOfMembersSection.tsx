import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormProgress from "./FormProgress";
import { useState } from "react";

interface ListOfMembersSectionProps {
  isSubmitted?: boolean;
}

const cooperatives = [
  { id: 1, name: "Wohnbaugenossenschaft 1" },
  { id: 2, name: "Dienstleistungsgenossenschaft 2" },
  { id: 3, name: "Agrargenossenschaft 3" },
];

export const ListOfMembersSection = ({ isSubmitted = false }: ListOfMembersSectionProps) => {
  const [formData, setFormData] = useState({
    cooperativeName: "",
    auditPeriod: "",
    memberCount: "",
    accessionsCount: "",
    cancellationsCount: "",
    properMaintenance: "",
    memberLimit: "",
    cancellationPeriod: "",
  });

  // Calculate progress based on filled fields
  const calculateProgress = () => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter(value => value !== "").length;
    return Math.round((filledFields / totalFields) * 100);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="p-6 space-y-8">
      <FormProgress progress={isSubmitted ? 100 : calculateProgress()} isSubmitted={isSubmitted} />
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Part 3 - Declaration on keeping the list of members</h2>
        <p className="text-sm text-muted-foreground mb-6">pursuant to §§ 53 ff GenG</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span>of the</span>
            <Select
              value={formData.cooperativeName}
              onValueChange={(value) => handleInputChange('cooperativeName', value)}
            >
              <SelectTrigger className="w-[240px] bg-background">
                <SelectValue placeholder="Select cooperative" />
              </SelectTrigger>
              <SelectContent>
                {cooperatives.map((coop) => (
                  <SelectItem key={coop.id} value={coop.name}>
                    {coop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>eG</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>for the audit for the</span>
            <Input 
              className="flex-1" 
              placeholder="Enter audit period"
              value={formData.auditPeriod}
              onChange={(e) => handleInputChange('auditPeriod', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="font-medium mb-4">With regard to the list of members at the end of the audit period, we declare the following:</p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Number of members</TableHead>
                <TableHead className="w-1/3">Number of accessions</TableHead>
                <TableHead>Number of cancellations & exclusions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Input 
                    type="number"
                    value={formData.memberCount}
                    onChange={(e) => handleInputChange('memberCount', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    value={formData.accessionsCount}
                    onChange={(e) => handleInputChange('accessionsCount', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    type="number"
                    value={formData.cancellationsCount}
                    onChange={(e) => handleInputChange('cancellationsCount', e.target.value)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="mb-4">The list of members has been properly maintained and the information regularly checked. All member declarations relating to their membership have been properly processed and recorded in the membership list.</p>
            <RadioGroup 
              className="flex gap-8"
              value={formData.properMaintenance}
              onValueChange={(value) => handleInputChange('properMaintenance', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="proper-maintenance-yes" />
                <Label htmlFor="proper-maintenance-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="proper-maintenance-no" />
                <Label htmlFor="proper-maintenance-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="mb-4">The cooperative had up to 20 members (maximum) during the relevant audit period.</p>
            <RadioGroup 
              className="flex gap-8"
              value={formData.memberLimit}
              onValueChange={(value) => handleInputChange('memberLimit', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="member-limit-yes" />
                <Label htmlFor="member-limit-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="member-limit-no" />
                <Label htmlFor="member-limit-no">No, there were more than 20 members</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="mb-4">If the cancellation period for members is longer than 1 year, the members were informed of the cancellation period via the corresponding membership declarations</p>
            <RadioGroup 
              className="flex gap-8"
              value={formData.cancellationPeriod}
              onValueChange={(value) => handleInputChange('cancellationPeriod', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="cancellation-period-yes" />
                <Label htmlFor="cancellation-period-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="cancellation-period-no" />
                <Label htmlFor="cancellation-period-no">No, the cancellation period is only 1 year.</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Form Overview of the executive bodies</h3>
          <p className="text-sm text-muted-foreground">pursuant to §§ 53 ff GenG</p>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Surname, first name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Profession practiced</TableHead>
                  <TableHead>Date of birth</TableHead>
                  <TableHead>Function</TableHead>
                  <TableHead>Election date</TableHead>
                  <TableHead>Cancelled/resigned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-sky-50">
                  <TableCell colSpan={7} className="font-medium">Management Board</TableCell>
                </TableRow>
                {[...Array(7)].map((_, i) => (
                  <TableRow key={`management-${i}`}>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input type="date" /></TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input type="date" /></TableCell>
                    <TableCell><Input type="date" /></TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-sky-50">
                  <TableCell colSpan={7} className="font-medium">Supervisory Board / Authorised representative of the General Meeting</TableCell>
                </TableRow>
                {[...Array(7)].map((_, i) => (
                  <TableRow key={`supervisory-${i}`}>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input type="date" /></TableCell>
                    <TableCell><Input /></TableCell>
                    <TableCell><Input type="date" /></TableCell>
                    <TableCell><Input type="date" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Card>
  );
};