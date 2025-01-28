import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import FinancialStatementsTable from "./FinancialStatementsTable";

interface AnnualFinancialStatementsData {
  statementsExist: "yes" | "no";
  statements: Array<{
    statement: string;
    setupDate: string;
    establishedDate: string;
    hasProtocol: "yes" | "no";
  }>;
  preparedBy: "cooperative" | "consultant";
  consultantDetails: string;
  compliesWithLaw: "yes" | "no" | "justify";
  estimatedValues: "yes" | "no" | "justify";
  specialCircumstances: "none" | "exist";
  circumstances: string;
  legalDisputesHandled: "yes" | "no";
}

const AnnualFinancialStatementsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Financial Statements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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

        <FormField
          control={form.control}
          name="preparedBy"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>The annual financial statements were prepared by:</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cooperative" id="preparedBy-cooperative" />
                    <FormLabel htmlFor="preparedBy-cooperative">The co-operative itself</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consultant" id="preparedBy-consultant" />
                    <FormLabel htmlFor="preparedBy-consultant">Through a tax consultant</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("preparedBy") === "consultant" && (
          <FormField
            control={form.control}
            name="consultantDetails"
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
      </CardContent>
    </Card>
  );
};

export default AnnualFinancialStatementsSection;