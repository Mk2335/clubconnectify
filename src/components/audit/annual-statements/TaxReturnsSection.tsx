import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

export const TaxReturnsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="taxReturnsSubmittedBy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tax returns were submitted by</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taxAssessmentNoticesUntil"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tax assessment notices are available until</FormLabel>
            <FormControl>
              <Input {...field} type="date" />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taxReturnsPreparedBy"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>The tax returns were prepared by:</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cooperative" id="taxPreparedBy-cooperative" />
                  <FormLabel htmlFor="taxPreparedBy-cooperative">The co-operative itself</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="consultant" id="taxPreparedBy-consultant" />
                  <FormLabel htmlFor="taxPreparedBy-consultant">Through a tax consultant</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("taxReturnsPreparedBy") === "consultant" && (
        <FormField
          control={form.control}
          name="taxConsultantDetails"
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

      <FormField
        control={form.control}
        name="multipleCooperativeMandates"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Does the tax advisor have more than one co-operative mandate?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="mandates-yes" />
                  <FormLabel htmlFor="mandates-yes">Yes</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="mandates-no" />
                  <FormLabel htmlFor="mandates-no">No</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taxAuditsCarriedOut"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Were tax audits carried out by the tax office during the relevant audit period?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="audits-yes" />
                  <FormLabel htmlFor="audits-yes">Yes, as follows (please enclose certificates)</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="audits-no" />
                  <FormLabel htmlFor="audits-no">No</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("taxAuditsCarriedOut") === "yes" && (
        <FormField
          control={form.control}
          name="taxAuditDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed description (audit reports and certificates must be enclosed):</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter audit details..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="supervisoryInstructions"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>
              No instructions, complaints or enquiries from the supervisory authorities relating to accounting or of significance for the audit were issued during the relevant audit period
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="instructions-yes" />
                  <FormLabel htmlFor="instructions-yes">Yes</FormLabel>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="instructions-no" />
                  <FormLabel htmlFor="instructions-no">No, they were issued as follows:</FormLabel>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch("supervisoryInstructions") === "no" && (
        <FormField
          control={form.control}
          name="supervisoryInstructionsDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed description:</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Enter details..." />
              </FormControl>
            </FormItem>
          )}
        />
      )}
    </div>
  );
};