import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import ManagementBooksSection from "./ManagementBooksSection";
import AnnualFinancialStatementsSection from "./AnnualFinancialStatementsSection";
import AdditionalFinancialStatementsSection from "./AdditionalFinancialStatementsSection";

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
  
  // New tax returns section properties
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
  const [progress, setProgress] = useState(0);
  
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
      
      // New tax returns section default values
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

  const { toast } = useToast();

  // Calculate progress whenever form values change
  useEffect(() => {
    const values = form.getValues();
    const totalFields = Object.keys(values).length;
    let filledFields = 0;

    const countFilledFields = (obj: any) => {
      Object.entries(obj).forEach(([_, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item === 'object') {
              countFilledFields(item);
            } else if (item) {
              filledFields++;
            }
          });
        } else if (typeof value === 'object' && value !== null) {
          countFilledFields(value);
        } else if (value) {
          filledFields++;
        }
      });
    };

    countFilledFields(values);
    const calculatedProgress = Math.round((filledFields / totalFields) * 100);
    setProgress(calculatedProgress);
  }, [form.watch()]);

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
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-muted-foreground">Completion Progress</p>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
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
