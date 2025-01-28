import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";

interface ComplianceQuestionsProps {
  form: UseFormReturn<any>;
}

export const ComplianceQuestions = ({ form }: ComplianceQuestionsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="memberLoanLimits"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Are the limits of §21b GenG observed for member loans?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="memberLoanLimits-yes" />
                  <Label htmlFor="memberLoanLimits-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="memberLoanLimits-no" />
                  <Label htmlFor="memberLoanLimits-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noDebtCertificates"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Were no debt certificates issued?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="noDebtCertificates-yes" />
                  <Label htmlFor="noDebtCertificates-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="noDebtCertificates-no" />
                  <Label htmlFor="noDebtCertificates-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noParticipationCertificates"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Were no participation certificates issued?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="noParticipationCertificates-yes" />
                  <Label htmlFor="noParticipationCertificates-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="noParticipationCertificates-no" />
                  <Label htmlFor="noParticipationCertificates-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};