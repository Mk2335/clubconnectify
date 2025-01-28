import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FileText } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { GeneralSection } from "@/components/audit/GeneralSection";
import { StatutesSection } from "@/components/audit/StatutesSection";
import { EmployeesSection } from "@/components/audit/EmployeesSection";
import { PromotionSection } from "@/components/audit/PromotionSection";
import { LegalDisputesSection } from "@/components/audit/LegalDisputesSection";
import { FinancialInstrumentsSection } from "@/components/audit/FinancialInstrumentsSection";
import { ShareholdingsSection } from "@/components/audit/ShareholdingsSection";
import { GeneralQuestionsSection } from "@/components/audit/GeneralQuestionsSection";
import { useEffect, useState } from "react";

const AuditQuestionnaire = () => {
  const [progress, setProgress] = useState(0);

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
      cryptoCurrencyTrading: "",
      derivativeInstruments: "",
      derivatives: Array(8).fill({
        number: "",
        type: "",
        description: "",
        value: "",
      }),
      dayTrading: "",
      hasShareholdings: "",
      shareholdingsPurpose: "",
      shareholdingsJustification: "",
      significantContracts: "",
      memberLoanLimits: "",
      noDebtCertificates: "",
      noParticipationCertificates: "",
      noSilentPartnerships: "",
      noAssetsEmbezzled: "",
      noCustomerAssetsEmbezzled: "",
      auditAssociationDisclosed: "",
      membersWithVotingRights: "",
      transparencyRegister: "",
      registrationDate: "",
      
      // New Insurance fields
      operationsLiabilityInsurance: "",
      dAndOInsurance: "",
      propertyDamageInsurance: "",
      creditDefaultInsurance: "",
      buildingInsuranceCoverage: "",
      buildingElementaryInsurance: "",
      
      // New IT & DSGVO fields
      electronicDataProcessing: "",
      itHardwareMonitoring: "",
      cloudBasedSoftware: "",
      dailyDataBackup: "",
      dataProtectionGuideline: "",
      gdprCompliance: "",
    },
  });

  // Calculate progress whenever form values change
  useEffect(() => {
    const values = form.getValues();
    const totalFields = Object.keys(values).length;
    let filledFields = 0;

    const countFilledFields = (obj: any) => {
      Object.entries(obj).forEach(([key, value]) => {
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Audit Questionnaire</h1>
            </div>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">Completion Progress</p>
                <span className="text-sm font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Complete the mandatory audit questionnaire according to §§ 53 ff GenG
            </p>
            <Form {...form}>
              <div className="space-y-8">
                <GeneralQuestionsSection form={form} />
                <GeneralSection form={form} />
                <StatutesSection form={form} />
                <EmployeesSection form={form} />
                <PromotionSection form={form} />
                <LegalDisputesSection form={form} />
                <FinancialInstrumentsSection form={form} />
                <ShareholdingsSection form={form} />
              </div>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AuditQuestionnaire;
