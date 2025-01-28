import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

export const MaterialChangesSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <FormField
      control={form.control}
      name="materialChanges"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>
            There were no material changes that affect the comparability of the balance sheet and income statement (or individual items) over time.
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="materialChanges-yes" />
                <FormLabel htmlFor="materialChanges-yes">Yes</FormLabel>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="materialChanges-no" />
                <FormLabel htmlFor="materialChanges-no">No</FormLabel>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};