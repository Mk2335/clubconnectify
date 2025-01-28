import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

export const MisstatementsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="materialMisstatements"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Risks that the annual financial statements may contain material misstatements due to violations or inaccuracies as a result of our judgement:
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="do-not-exist" id="materialMisstatements-none" />
                  <FormLabel htmlFor="materialMisstatements-none">Do not exist</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exist" id="materialMisstatements-exist" />
                  <FormLabel htmlFor="materialMisstatements-exist">Are as follows</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("materialMisstatements") === "exist" && (
        <FormField
          control={form.control}
          name="materialMisstatementsDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed description:</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Please describe the risks of material misstatements..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};