import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

interface SecurityQuestionsProps {
  form: UseFormReturn<any>;
}

export const SecurityQuestions = ({ form }: SecurityQuestionsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="noSilentPartnerships"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Were no silent partnerships entered into?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="noSilentPartnerships-yes" />
                  <Label htmlFor="noSilentPartnerships-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="noSilentPartnerships-no" />
                  <Label htmlFor="noSilentPartnerships-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noAssetsEmbezzled"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Has no cooperative property been embezzled?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="noAssetsEmbezzled-yes" />
                  <Label htmlFor="noAssetsEmbezzled-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="noAssetsEmbezzled-no" />
                  <Label htmlFor="noAssetsEmbezzled-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noCustomerAssetsEmbezzled"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Has no property of customers or members been embezzled?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="noCustomerAssetsEmbezzled-yes" />
                  <Label htmlFor="noCustomerAssetsEmbezzled-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="noCustomerAssetsEmbezzled-no" />
                  <Label htmlFor="noCustomerAssetsEmbezzled-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};