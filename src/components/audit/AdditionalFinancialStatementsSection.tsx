import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { MaterialChangesSection } from "./additional-statements/MaterialChangesSection";
import { ViolationsSection } from "./additional-statements/ViolationsSection";
import { MisstatementsSection } from "./additional-statements/MisstatementsSection";
import { DeceptionsSection } from "./additional-statements/DeceptionsSection";
import { TransactionsSection } from "./additional-statements/TransactionsSection";

const AdditionalFinancialStatementsSection = ({ form }: { form: UseFormReturn<any> }) => {
  return (
    <Card>
      <CardContent className="space-y-6 pt-6">
        <MaterialChangesSection form={form} />
        <ViolationsSection form={form} />
        <MisstatementsSection form={form} />
        <DeceptionsSection form={form} />
        <TransactionsSection form={form} />
      </CardContent>
    </Card>
  );
};

export default AdditionalFinancialStatementsSection;