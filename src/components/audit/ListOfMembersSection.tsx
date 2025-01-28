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

export const ListOfMembersSection = () => {
  return (
    <Card className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-2">Part 3 - Declaration on keeping the list of members</h2>
        <p className="text-sm text-muted-foreground mb-6">pursuant to §§ 53 ff GenG</p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2">
            <span>of the</span>
            <Input className="flex-1" placeholder="Enter cooperative name" />
            <span>eG</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span>for the audit for the</span>
            <Input className="flex-1" placeholder="Enter audit period" />
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
                  <Input type="number" />
                </TableCell>
                <TableCell>
                  <Input type="number" />
                </TableCell>
                <TableCell>
                  <Input type="number" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="mb-4">The list of members has been properly maintained and the information regularly checked. All member declarations relating to their membership have been properly processed and recorded in the membership list.</p>
            <RadioGroup className="flex gap-8">
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
            <RadioGroup className="flex gap-8">
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
            <RadioGroup className="flex gap-8">
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
      </div>
    </Card>
  );
};