import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

interface AdditionalFinancialStatementsProps {
  form: UseFormReturn<any>;
}

const AdditionalFinancialStatementsSection = ({ form }: AdditionalFinancialStatementsProps) => {
  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <FormField
          control={form.control}
          name="materialChanges"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                There were no material changes that affect the comparability of the balance sheet and income statement (or individual items) over time.
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="materialChanges-yes" />
                    <FormLabel htmlFor="materialChanges-yes">Yes</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="materialChanges-no" />
                    <FormLabel htmlFor="materialChanges-no">No</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statutoryViolations"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Violations of statutory provisions and supplementary provisions of the Articles of Association that are of significance for the content of the annual financial statements or on the presentation of the net assets, financial position and results of operations of the cooperative in accordance with Section 264 para. 2 HGB in conjunction with Section 336 para. 2 sentence 1 HGB. § in conjunction with Section 336 (2) sentence 1 HGB on the net assets, financial position and results of operations of the cooperative:
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="do-not-exist" id="statutoryViolations-none" />
                    <FormLabel htmlFor="statutoryViolations-none">Do not exist</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exist" id="statutoryViolations-exist" />
                    <FormLabel htmlFor="statutoryViolations-exist">Are as follows</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("statutoryViolations") === "exist" && (
          <FormField
            control={form.control}
            name="statutoryViolationsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed description:</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Please provide details about the violations..." />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="materialMisstatements"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Risks that the annual financial statements may contain material misstatements due to violations or inaccuracies as a result of our judgement:
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="do-not-exist" id="materialMisstatements-none" />
                    <FormLabel htmlFor="materialMisstatements-none">Do not exist</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exist" id="materialMisstatements-exist" />
                    <FormLabel htmlFor="materialMisstatements-exist">Are as follows</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("materialMisstatements") === "exist" && (
          <FormField
            control={form.control}
            name="materialMisstatementsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed description:</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Please describe the risks of material misstatements..." />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="deceptions"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                All deceptions and misappropriations known to us, suspected by us or brought to our attention concerning the cooperative to be audited, in particular those of legal representatives and other managers, of employees who play a significant role in the internal control system and of other persons whose deceptions and misappropriations have a material impact on the cooperative's financial statements:
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="do-not-exist" id="deceptions-none" />
                    <FormLabel htmlFor="deceptions-none">Do not exist</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exist" id="deceptions-exist" />
                    <FormLabel htmlFor="deceptions-exist">Are as follows</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("deceptions") === "exist" && (
          <FormField
            control={form.control}
            name="deceptionsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed description:</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Please describe the deceptions and misappropriations..." />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="offBalanceTransactions"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Transactions not included in the balance sheet (e.g. redemption or repurchase claims or obligations, factoring, non-genuine repurchase agreements, consignment stock agreements, securitisation of receivables via separate companies or unincorporated entities, pledging of assets, operating and financial liabilities) are not included in the balance sheet:
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

        <FormField
          control={form.control}
          name="postBalanceEvents"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Events after the respective reporting date that require adjustments or disclosures in the respective annual financial statements in accordance with German commercial law:
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="do-not-exist" id="postBalanceEvents-none" />
                    <FormLabel htmlFor="postBalanceEvents-none">Do not exist</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exist" id="postBalanceEvents-exist" />
                    <FormLabel htmlFor="postBalanceEvents-exist">Are as follows</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("postBalanceEvents") === "exist" && (
          <FormField
            control={form.control}
            name="postBalanceEventsDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detailed description:</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Please describe the post-balance events..." />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="materialEventsBeforeAudit"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                If material events occur before the audit report is received that could lead to a change in the annual financial statements or annual financial statements, the cooperative auditing association entrusted with the audit is informed immediately.
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="materialEventsBeforeAudit-yes" />
                    <FormLabel htmlFor="materialEventsBeforeAudit-yes">Yes</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="materialEventsBeforeAudit-no" />
                    <FormLabel htmlFor="materialEventsBeforeAudit-no">No</FormLabel>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receivablesFromBoards"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Receivables (including recourse claims) against members of the Supervisory Board and /or the Executive Board (Section 338 (3) HGB)
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="do-not-exist" id="receivablesFromBoards-none" />
                    <FormLabel htmlFor="receivablesFromBoards-none">Do not exist</FormLabel>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="exist" id="receivablesFromBoards-exist" />
                    <FormLabel htmlFor="receivablesFromBoards-exist">And are included separately in the JA</FormLabel>
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

export default AdditionalFinancialStatementsSection;