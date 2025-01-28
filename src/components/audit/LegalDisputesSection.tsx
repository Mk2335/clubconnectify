import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface LegalDisputesSectionProps {
  form: UseFormReturn<any>;
}

export const LegalDisputesSection = ({ form }: LegalDisputesSectionProps) => {
  return (
    <section className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold">V. Legal Disputes</h2>
      </div>

      <FormField
        control={form.control}
        name="legalDisputes"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Were there any legal disputes during the audit period and were any proceedings concluded during this period?
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="legalDisputes-yes" />
                  <label htmlFor="legalDisputes-yes">Yes</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="legalDisputes-no" />
                  <label htmlFor="legalDisputes-no">No</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="disputesCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of disputes:</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalDisputeValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total dispute value:</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="disputeDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Brief description of legal disputes:</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead className="w-[200px]">Status</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[200px]">Dispute Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Input {...form.register(`disputes.${index}.status`)} />
              </TableCell>
              <TableCell>
                <Input {...form.register(`disputes.${index}.description`)} />
              </TableCell>
              <TableCell>
                <Input 
                  type="number" 
                  {...form.register(`disputes.${index}.value`)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};