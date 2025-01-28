import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

export const ViolationsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="statutoryViolations"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Violations of statutory provisions and supplementary provisions of the Articles of Association that are of significance for the content of the annual financial statements or on the presentation of the net assets, financial position and results of operations of the cooperative:
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="do-not-exist" id="statutoryViolations-none" />
                  <FormLabel htmlFor="statutoryViolations-none">Do not exist</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exist" id="statutoryViolations-exist" />
                  <FormLabel htmlFor="statutoryViolations-exist">Are as follows</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("statutoryViolations") === "exist" && (
        <FormField
          control={form.control}
          name="statutoryViolationsDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed description:</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Please provide details about the violations..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};