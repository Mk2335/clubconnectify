import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

export const PreparationSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="preparedBy"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>The annual financial statements were prepared by:</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cooperative" id="preparedBy-cooperative" />
                  <FormLabel htmlFor="preparedBy-cooperative">The co-operative itself</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consultant" id="preparedBy-consultant" />
                  <FormLabel htmlFor="preparedBy-consultant">Through a tax consultant</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("preparedBy") === "consultant" && (
        <FormField
          control={form.control}
          name="consultantDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax consultant (name, address, contact person, telephone number, e-mail):</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter consultant details..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};