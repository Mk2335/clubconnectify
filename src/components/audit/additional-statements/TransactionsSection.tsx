import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

export const TransactionsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="offBalanceTransactions"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              Transactions not included in the balance sheet (e.g. redemption or repurchase claims or obligations):
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="do-not-exist" id="offBalanceTransactions-none" />
                  <FormLabel htmlFor="offBalanceTransactions-none">Do not exist</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exist" id="offBalanceTransactions-exist" />
                  <FormLabel htmlFor="offBalanceTransactions-exist">Are as follows</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("offBalanceTransactions") === "exist" && (
        <FormField
          control={form.control}
          name="offBalanceTransactionsDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed description:</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Please describe the off-balance transactions..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};