import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface GeneralQuestionsSectionProps {
  form: UseFormReturn<any>;
}

export const GeneralQuestionsSection = ({ form }: GeneralQuestionsSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">General Questions</h2>

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

      <FormField
        control={form.control}
        name="auditAssociationDisclosed"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is the audit association named on the website or letterhead?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="auditAssociationDisclosed-yes" />
                  <Label htmlFor="auditAssociationDisclosed-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="auditAssociationDisclosed-no" />
                  <Label htmlFor="auditAssociationDisclosed-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};