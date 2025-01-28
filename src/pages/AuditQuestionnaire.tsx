import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { GeneralSection } from "@/components/audit/GeneralSection";
import { StatutesSection } from "@/components/audit/StatutesSection";
import { EmployeesSection } from "@/components/audit/EmployeesSection";
import { PromotionSection } from "@/components/audit/PromotionSection";
import { LegalDisputesSection } from "@/components/audit/LegalDisputesSection";
import { FinancialInstrumentsSection } from "@/components/audit/FinancialInstrumentsSection";
import { ShareholdingsSection } from "@/components/audit/ShareholdingsSection";
import { GeneralQuestionsSection } from "@/components/audit/GeneralQuestionsSection";
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

interface AuditQuestionnaireProps {
  isSubmitted?: boolean;
}

const AuditQuestionnaire = ({ isSubmitted = false }: AuditQuestionnaireProps) => {
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
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <FileText className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Audit Questionnaire</h2>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isSubmitted ? "Questionnaire Submitted" : "Completion Progress"}
            </p>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={isSubmitted ? 100 : progress} className="h-2" />
        </div>

        <p className="text-muted-foreground">
          Complete the mandatory audit questionnaire according to §§ 53 ff GenG
        </p>

        <Form {...form}>
          <form className="space-y-8">
            <GeneralQuestionsSection form={form} />
            <GeneralSection form={form} />
            <StatutesSection form={form} />
            <EmployeesSection form={form} />
            <PromotionSection form={form} />
            <LegalDisputesSection form={form} />
            <FinancialInstrumentsSection form={form} />
            <ShareholdingsSection form={form} />
          </form>
        </Form>
      </div>
    </Card>
  );
};

export default AuditQuestionnaire;
