import { FormField, FormItem, FormControl } from "@/components/ui/form";
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
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface PromotionSectionProps {
  form: UseFormReturn<any>;
}

export const PromotionSection = ({ form }: PromotionSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">IV. Promotion and realisation of objectives</h2>
      
      <div className="space-y-6">
        <div>
          <Label className="text-base mb-4">No dividends were distributed during the relevant audit period:</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="dividends-yes" />
              <Label htmlFor="dividends-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="dividends-no" />
              <Label htmlFor="dividends-no">No, specifically:</Label>
            </div>
          </RadioGroup>
          
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Nr.</TableHead>
                <TableHead className="w-32">Year</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-24">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" />
                  </TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" />
                  </TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <Label className="text-base mb-4">During the relevant audit period, member promotion, particularly natural promotion, took place:</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="natural-promotion-yes" />
              <Label htmlFor="natural-promotion-yes">Yes, specifically:</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="natural-promotion-no" />
              <Label htmlFor="natural-promotion-no">No</Label>
            </div>
          </RadioGroup>
          
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Nr.</TableHead>
                <TableHead className="w-32">Year</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" />
                  </TableCell>
                  <TableCell>
                    <Input type="text" className="w-full" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <Label className="text-base mb-4">The promotional services in the relevant audit period were offered to all regular members:</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="promotional-services-yes" />
              <Label htmlFor="promotional-services-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="promotional-services-no" />
              <Label htmlFor="promotional-services-no">No</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label className="text-base mb-4">Are the members satisfied with the cooperative's promotional services during the audit period (please attach promotional balance and plan)?</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="member-satisfaction-yes" />
              <Label htmlFor="member-satisfaction-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="member-satisfaction-no" />
              <Label htmlFor="member-satisfaction-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </Card>
  );
};