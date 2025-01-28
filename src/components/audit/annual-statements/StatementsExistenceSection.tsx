import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import FinancialStatementsTable from "../FinancialStatementsTable";

export const StatementsExistenceSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="statementsExist"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              One or more annual financial statements were prepared during the relevant audit period.
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="statementsExist-yes" />
                  <FormLabel htmlFor="statementsExist-yes">Yes</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="statementsExist-no" />
                  <FormLabel htmlFor="statementsExist-no">No</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("statementsExist") === "yes" && (
        <FinancialStatementsTable form={form} />
      )}
    </div>
  );
};