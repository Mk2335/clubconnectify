import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface StatutesSectionProps {
  form: UseFormReturn<any>;
}

export const StatutesSection = ({ form }: StatutesSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">II. Statutes</h2>
      
      <div className="space-y-6">
        <div>
          <Label className="text-base mb-4">No changes to the statutes were made during the relevant audit period:</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="statute-yes" />
              <Label htmlFor="statute-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="statute-no" />
              <Label htmlFor="statute-no">No, specifically:</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4 pl-6">
          <Label className="text-base mb-2">The amendment to the statutes concerns one or more of the following points:</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="statuteChangeDetails.purpose"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="purpose" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="purpose">Change of cooperative purpose</Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statuteChangeDetails.businessObject"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="businessObject" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="businessObject">Change of business object</Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statuteChangeDetails.shareValue"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="shareValue" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="shareValue">Change in share value</Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statuteChangeDetails.mandatoryShares"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="mandatoryShares" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="mandatoryShares">Change in number of mandatory shares</Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statuteChangeDetails.boardSupervisory"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="boardSupervisory" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="boardSupervisory">Changes regarding board and supervisory board</Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statuteChangeDetails.additionalPayment"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="additionalPayment" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="additionalPayment">Additional payment or liability amount</Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statuteChangeDetails.membership"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="membership" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="membership">Membership matters</Label>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="statuteChangeDetails.other"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <Checkbox 
                    id="other" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="other">Other changes</Label>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <Label className="text-base mb-4">Has the amendment to the statutes been registered in the cooperative register?</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="registration-yes" />
              <Label htmlFor="registration-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="registration-no" />
              <Label htmlFor="registration-no">No, specifically:</Label>
            </div>
          </RadioGroup>
          <FormField
            control={form.control}
            name="registrationJustification"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl>
                  <Textarea 
                    placeholder="Enter justification..."
                    className="h-20"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
};