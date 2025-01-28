import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useFormProgress } from "@/hooks/useFormProgress";
import ManagementBooksSection from "./ManagementBooksSection";
import AnnualFinancialStatementsSection from "./AnnualFinancialStatementsSection";
import AdditionalFinancialStatementsSection from "./AdditionalFinancialStatementsSection";
import FormProgress from "./FormProgress";
import { AccountingQuestionnaireData } from "@/types/accountingQuestionnaire";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const AccountingQuestionnaire = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    setIsSubmitted(true);
    toast({
      title: "Form submitted",
      description: "Your accounting questionnaire has been saved.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormProgress progress={progress} isSubmitted={isSubmitted} />
        <Card className="space-y-8 p-6">
          <ManagementBooksSection form={form} />
          <AnnualFinancialStatementsSection form={form} />
          <AdditionalFinancialStatementsSection form={form} />
        </Card>
        <div className="flex justify-end">
          <Button type="submit">Submit Questionnaire</Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountingQuestionnaire;
