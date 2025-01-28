import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AccountingQuestionnaireData {
  internalControls: "yes" | "no";
  disruptionsAvailable: "not-available" | "available";
  disruptionsExplanation: string;
  germanAccounting: "yes" | "no";
  dataRetention: "yes" | "no";
  riskManagement: "yes" | "no";
  bookkeeping: "internal" | "external";
}

const AccountingQuestionnaire = () => {
  const form = useForm<AccountingQuestionnaireData>({
    defaultValues: {
      internalControls: "no",
      disruptionsAvailable: "not-available",
      disruptionsExplanation: "",
      germanAccounting: "no",
      dataRetention: "no",
      riskManagement: "no",
      bookkeeping: "internal",
    },
  });

  const { toast } = useToast();

  const onSubmit = (data: AccountingQuestionnaireData) => {
    console.log(data);
    toast({
      title: "Form submitted",
      description: "Your accounting questionnaire has been saved.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Management of the Books</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="internalControls"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    We have fulfilled our responsibility to establish and maintain accounting-related internal controls that we have
                    determined to be necessary in accordance with German generally accepted accounting principles to enable the
                    preparation of annual financial statements that are free from material misstatement, whether due to fraud or
                    error.
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="internalControls-yes" />
                        <FormLabel htmlFor="internalControls-yes">Yes</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="internalControls-no" />
                        <FormLabel htmlFor="internalControls-no">No</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disruptionsAvailable"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Disruptions or deficiencies (material weaknesses) in accounting-related internal controls</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-available" id="disruptions-not-available" />
                        <FormLabel htmlFor="disruptions-not-available">Were not and are not currently available</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="available" id="disruptions-available" />
                        <FormLabel htmlFor="disruptions-available">Are as follows</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("disruptionsAvailable") === "available" && (
              <FormField
                control={form.control}
                name="disruptionsExplanation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Explanation:</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Please explain the disruptions or deficiencies..." />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="germanAccounting"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    All business transactions were recorded in accordance with the German principles of proper accounting and are
                    recognized in the books presented in accordance with German commercial law.
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="germanAccounting-yes" />
                        <FormLabel htmlFor="germanAccounting-yes">Yes</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="germanAccounting-no" />
                        <FormLabel htmlFor="germanAccounting-no">No</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataRetention"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    We have ensured that data that is not printed out is also available at all times and made readable within a
                    reasonable period of time within the framework of the statutory retention obligations and periods.
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="dataRetention-yes" />
                        <FormLabel htmlFor="dataRetention-yes">Yes</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="dataRetention-no" />
                        <FormLabel htmlFor="dataRetention-no">No</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riskManagement"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    We have dealt appropriately with the cooperative's risk situation. Where risks were identified, they were
                    communicated to the Supervisory Board and the Annual General Meeting.
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="riskManagement-yes" />
                        <FormLabel htmlFor="riskManagement-yes">Yes</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="riskManagement-no" />
                        <FormLabel htmlFor="riskManagement-no">No</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bookkeeping"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>The books and accounts are kept by</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="internal" id="bookkeeping-internal" />
                        <FormLabel htmlFor="bookkeeping-internal">Internally by the cooperative itself</FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="external" id="bookkeeping-external" />
                        <FormLabel htmlFor="bookkeeping-external">Externally by a tax consultant or service provider</FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Submit Questionnaire</Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountingQuestionnaire;