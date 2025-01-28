import { UseFormReturn } from "react-hook-form";
import { ComplianceQuestions } from "./general-questions/ComplianceQuestions";
import { SecurityQuestions } from "./general-questions/SecurityQuestions";
import { RegistrationQuestions } from "./general-questions/RegistrationQuestions";
import { Card } from "@/components/ui/card";

interface GeneralQuestionsSectionProps {
  form: UseFormReturn<any>;
}

export const GeneralQuestionsSection = ({ form }: GeneralQuestionsSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-8">General Questions</h2>
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">Compliance</h3>
          <ComplianceQuestions form={form} />
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <SecurityQuestions form={form} />
        </section>
        
        <section>
          <h3 className="text-lg font-semibold mb-4">Registration</h3>
          <RegistrationQuestions form={form} />
        </section>
      </div>
    </Card>
  );
};