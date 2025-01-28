import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { StatementsExistenceSection } from "./annual-statements/StatementsExistenceSection";
import { PreparationSection } from "./annual-statements/PreparationSection";
import { ComplianceSection } from "./annual-statements/ComplianceSection";
import { CircumstancesSection } from "./annual-statements/CircumstancesSection";
import { TaxReturnsSection } from "./annual-statements/TaxReturnsSection";

const AnnualFinancialStatementsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Annual Financial Statements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <StatementsExistenceSection form={form} />
        <PreparationSection form={form} />
        <ComplianceSection form={form} />
        <CircumstancesSection form={form} />
        <TaxReturnsSection form={form} />
      </CardContent>
    </Card>
  );
};

export default AnnualFinancialStatementsSection;