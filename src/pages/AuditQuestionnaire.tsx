import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";

const AuditQuestionnaire = () => {
  const form = useForm({
    defaultValues: {
      financialYear1: "",
      financialYear2: "",
      balanceSheet1: "",
      balanceSheet2: "",
      revenue1: "",
      revenue2: "",
      additionalContribution: "",
      memberLoans: "",
      statuteChanges: "",
      statuteChangeDetails: {
        purpose: false,
        businessObject: false,
        shareValue: false,
        mandatoryShares: false,
        boardSupervisory: false,
        additionalPayment: false,
        membership: false,
        other: false,
      },
      statuteRegistration: "",
      registrationJustification: "",
      newBusinessActivities: "",
      newActivitiesDescription: "",
      businessAlignment: "",
    },
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <div className="flex items-center gap-4 mb-8">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Audit Questionnaire</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Complete the mandatory audit questionnaire according to §§ 53 ff GenG
            </p>
            <Form {...form}>
              <div className="space-y-8">
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">I. General Section</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Information for the last two financial years:</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-1/3">Description</TableHead>
                            <TableHead>Previous Year</TableHead>
                            <TableHead>Current Year</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Financial year ending on:</TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name="financialYear1"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name="financialYear2"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Balance sheet total in EURO:</TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name="balanceSheet1"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name="balanceSheet2"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Revenue in EURO:</TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name="revenue1"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name="revenue2"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="number" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-base">The current statutes do not provide for an obligation to make additional contributions:</Label>
                        <RadioGroup className="mt-2 flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="additional-yes" />
                            <Label htmlFor="additional-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="additional-no" />
                            <Label htmlFor="additional-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div>
                        <Label className="text-base">The cooperative has not accepted loans (§ 21b GenG) from its members or offered asset investments exclusively to its members:</Label>
                        <RadioGroup className="mt-2 flex items-center gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="loans-yes" />
                            <Label htmlFor="loans-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="loans-no" />
                            <Label htmlFor="loans-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </Card>

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

                    <div>
                      <Label className="text-base mb-4">No new business activities were undertaken during the relevant audit period:</Label>
                      <RadioGroup className="mt-2 flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="activities-yes" />
                          <Label htmlFor="activities-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="activities-no" />
                          <Label htmlFor="activities-no">No, specifically:</Label>
                        </div>
                      </RadioGroup>
                      <FormField
                        control={form.control}
                        name="newActivitiesDescription"
                        render={({ field }) => (
                          <FormItem className="mt-2">
                            <FormControl>
                              <Textarea 
                                placeholder="Describe new business activities..."
                                className="h-20"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <Label className="text-base mb-4">The business operations conducted by the cooperative (including any new business activities) during the audit period are in accordance with the business purpose as stated in the statutes:</Label>
                      <RadioGroup className="mt-2 flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="alignment-yes" />
                          <Label htmlFor="alignment-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="alignment-no" />
                          <Label htmlFor="alignment-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </Card>
              </div>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AuditQuestionnaire;
