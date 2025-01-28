import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

export const ComplianceSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="compliesWithLaw"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              We have fulfilled our responsibility for the preparation of the annual financial statements. The annual financial statements comply in all material respects with German commercial law applicable to cooperatives and give a true and fair view in accordance with German generally accepted accounting principles.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="compliesWithLaw-yes" />
                  <FormLabel htmlFor="compliesWithLaw-yes">Yes</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="justify" id="compliesWithLaw-justify" />
                  <FormLabel htmlFor="compliesWithLaw-justify">No, justify on a separate attachment!</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="estimatedValues"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              The most significant assumptions on which we have based the determination of estimated values, including estimated fair values, are reasonable and reflect our intention and possibility to carry out corresponding actions.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="estimatedValues-yes" />
                  <FormLabel htmlFor="estimatedValues-yes">Yes</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="justify" id="estimatedValues-justify" />
                  <FormLabel htmlFor="estimatedValues-justify">No, justify on a separate attachment!</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};