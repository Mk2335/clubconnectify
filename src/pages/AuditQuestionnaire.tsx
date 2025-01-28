import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FileText } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { GeneralSection } from "@/components/audit/GeneralSection";
import { StatutesSection } from "@/components/audit/StatutesSection";
import { EmployeesSection } from "@/components/audit/EmployeesSection";
import { PromotionSection } from "@/components/audit/PromotionSection";
import { LegalDisputesSection } from "@/components/audit/LegalDisputesSection";

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
      employeesCount: "",
      employeesDescription: "",
      legalDisputes: "",
      legalDisputesDescription: "",
      dividends: "",
      dividendEntries: [{ year: "", description: "", percentage: "" }],
      naturalPromotion: "",
      naturalPromotionEntries: [{ year: "", description: "" }],
      promotionalServices: "",
      memberSatisfaction: "",
      disputesCount: "",
      totalDisputeValue: "",
      disputeDescription: "",
      disputes: Array(5).fill({
        status: "",
        description: "",
        value: "",
      }),
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
                <GeneralSection form={form} />
                <StatutesSection form={form} />
                <EmployeesSection form={form} />
                <PromotionSection form={form} />
                <LegalDisputesSection form={form} />
              </div>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AuditQuestionnaire;
