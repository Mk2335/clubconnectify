import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFormProgress } from "@/hooks/useFormProgress";
import ManagementBooksSection from "./ManagementBooksSection";
import AnnualFinancialStatementsSection from "./AnnualFinancialStatementsSection";
import AdditionalFinancialStatementsSection from "./AdditionalFinancialStatementsSection";
import FormProgress from "./FormProgress";

interface AccountingQuestionnaireData {
  internalControls: "yes" | "no";
  disruptionsAvailable: "not-available" | "available";
  disruptionsExplanation: string;
  germanAccounting: "yes" | "no";
  dataRetention: "yes" | "no";
  riskManagement: "yes" | "no";
  bookkeeping: "internal" | "external";
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
  taxReturnsSubmittedBy: string;
  taxAssessmentNoticesUntil: string;
  taxReturnsPreparedBy: "cooperative" | "consultant";
  taxConsultantDetails: string;
  multipleCooperativeMandates: "yes" | "no";
  taxAuditsCarriedOut: "yes" | "no";
  taxAuditDetails: string;
  supervisoryInstructions: "yes" | "no";
  supervisoryInstructionsDetails: string;
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
      legalDisputesHandled: "yes",
      taxReturnsSubmittedBy: "",
      taxAssessmentNoticesUntil: "",
      taxReturnsPreparedBy: "cooperative",
      taxConsultantDetails: "",
      multipleCooperativeMandates: "no",
      taxAuditsCarriedOut: "no",
      taxAuditDetails: "",
      supervisoryInstructions: "yes",
      supervisoryInstructionsDetails: "",
    },
  });

  const progress = useFormProgress(form);
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
        <FormProgress progress={progress} />
        <ManagementBooksSection form={form} />
        <AnnualFinancialStatementsSection form={form} />
        <AdditionalFinancialStatementsSection form={form} />
        <div className="flex justify-end">
          <Button type="submit">Submit Questionnaire</Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountingQuestionnaire;