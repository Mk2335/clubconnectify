import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UseFormReturn } from "react-hook-form";

interface AnnualGeneralMeetingSectionProps {
  form: UseFormReturn<any>;
}

export const AnnualGeneralMeetingSection = ({ form }: AnnualGeneralMeetingSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">4. Annual General Meeting</h3>
      
      <FormField
        control={form.control}
        name="hasAnnualGeneralMeeting"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>At least one Annual General Meeting was held during the relevant audit period.</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="agm-yes" />
                  <Label htmlFor="agm-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="agm-no" />
                  <Label htmlFor="agm-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Year</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Occasion</TableHead>
              <TableHead>Reason for extraordinary</TableHead>
              <TableHead>Protocol available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(8)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`meetings.${index}.year`}
                    render={({ field }) => (
                      <Input {...field} className="w-full" />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`meetings.${index}.date`}
                    render={({ field }) => (
                      <Input {...field} type="date" className="w-full" />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`meetings.${index}.occasion`}
                    render={({ field }) => (
                      <Input {...field} className="w-full" />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`meetings.${index}.reason`}
                    render={({ field }) => (
                      <Input {...field} className="w-full" />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <FormField
                    control={form.control}
                    name={`meetings.${index}.protocolAvailable`}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FormField
        control={form.control}
        name="hasCreditLimit"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>The General Meeting has resolved a credit limit in accordance with §49 GenG.</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="credit-limit-yes" />
                  <Label htmlFor="credit-limit-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="credit-limit-no" />
                  <Label htmlFor="credit-limit-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};