import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

export const CircumstancesSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="specialCircumstances"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Special circumstances that could jeopardise the Cooperative's ability to continue as a going concern or to present a true and fair view of its net assets, financial position and results of operations, earnings situation (Section 264 (2) HGB in conjunction with Section 336 (2) sentence 1 HGB) of the cooperative:
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="specialCircumstances-none" />
                  <FormLabel htmlFor="specialCircumstances-none">Do not exist</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exist" id="specialCircumstances-exist" />
                  <FormLabel htmlFor="specialCircumstances-exist">Are as follows</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("specialCircumstances") === "exist" && (
        <FormField
          control={form.control}
          name="circumstances"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Special circumstances:</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Describe the special circumstances..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="legalDisputesHandled"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              The effects of actual or potential legal disputes and claims known to us, the effects of which are to be taken into account in the preparation of the annual financial statements, have been taken into account. The financial statements are recognised in accordance with German commercial law.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="legalDisputesHandled-yes" />
                  <FormLabel htmlFor="legalDisputesHandled-yes">Yes</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="legalDisputesHandled-no" />
                  <FormLabel htmlFor="legalDisputesHandled-no">No</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};