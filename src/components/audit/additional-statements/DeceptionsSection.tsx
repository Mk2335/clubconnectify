import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

export const DeceptionsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="deceptions"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              All deceptions and misappropriations known to us, suspected by us or brought to our attention concerning the cooperative to be audited:
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="do-not-exist" id="deceptions-none" />
                  <FormLabel htmlFor="deceptions-none">Do not exist</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exist" id="deceptions-exist" />
                  <FormLabel htmlFor="deceptions-exist">Are as follows</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("deceptions") === "exist" && (
        <FormField
          control={form.control}
          name="deceptionsDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed description:</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Please describe the deceptions and misappropriations..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};