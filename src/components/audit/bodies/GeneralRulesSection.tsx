import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

interface GeneralRulesSectionProps {
  form: UseFormReturn<any>;
}

export const GeneralRulesSection = ({ form }: GeneralRulesSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">2. General rules of procedure</h3>
      
      <FormField
        control={form.control}
        name="hasGeneralRules"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>Does the cooperative have general rules of procedure?</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="general-rules-yes" />
                  <Label htmlFor="general-rules-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="general-rules-no" />
                  <Label htmlFor="general-rules-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noGeneralRulesChanges"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>No changes were made to the General Rules of Procedure during the relevant audit period</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="general-rules-changes-yes" />
                  <Label htmlFor="general-rules-changes-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="general-rules-changes-no" />
                  <Label htmlFor="general-rules-changes-no">No, see protocols</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hasManagementRules"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>Does the Management Board have rules of procedure?</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="management-rules-yes" />
                  <Label htmlFor="management-rules-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="management-rules-no" />
                  <Label htmlFor="management-rules-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noManagementRulesChanges"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>No changes were made to the rules of procedure for the Executive Board during the relevant audit period</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="management-rules-changes-yes" />
                  <Label htmlFor="management-rules-changes-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="management-rules-changes-no" />
                  <Label htmlFor="management-rules-changes-no">No, see protocols</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="hasSupervisoryRules"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>Does the Supervisory Board have rules of procedure?</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="supervisory-rules-yes" />
                  <Label htmlFor="supervisory-rules-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="supervisory-rules-no" />
                  <Label htmlFor="supervisory-rules-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noSupervisoryRulesChanges"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>No changes were made to the Supervisory Board's rules of procedure during the relevant audit period</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="supervisory-rules-changes-yes" />
                  <Label htmlFor="supervisory-rules-changes-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="supervisory-rules-changes-no" />
                  <Label htmlFor="supervisory-rules-changes-no">No, see protocols</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};