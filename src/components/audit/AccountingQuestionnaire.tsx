import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ManagementBooksSection from "./ManagementBooksSection";
import AnnualFinancialStatementsSection from "./AnnualFinancialStatementsSection";

interface AccountingQuestionnaireData {
  internalControls: "yes" | "no";
  disruptionsAvailable: "not-available" | "available";
  disruptionsExplanation: string;
  germanAccounting: "yes" | "no";
  dataRetention: "yes" | "no";
  riskManagement: "yes" | "no";
  bookkeeping: "internal" | "external";
  // Annual Financial Statements section
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
      // Annual Financial Statements section defaults
      statementsExist: "no",
      statements: Array(4).fill({
        statement: "",
        setupDate: "",
        establishedDate: "",
        hasProtocol: "no"
      }),
      preparedBy: "cooperative",
      consultantDetails: "",
      compliesWithLaw: "yes",
      estimatedValues: "yes",
      specialCircumstances: "none",
      circumstances: "",
      legalDisputesHandled: "yes"
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
        <ManagementBooksSection form={form} />
        <AnnualFinancialStatementsSection form={form} />
        <div className="flex justify-end">
          <Button type="submit">Submit Questionnaire</Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountingQuestionnaire;