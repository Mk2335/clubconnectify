import { UseFormReturn } from "react-hook-form";
import { InsuranceQuestions } from "./insurance/InsuranceQuestions";
import { ITSecurityQuestions } from "./it/ITSecurityQuestions";

interface ComplianceQuestionsProps {
  form: UseFormReturn<any>;
}

export const ComplianceQuestions = ({ form }: ComplianceQuestionsProps) => {
  return (
    <div className="space-y-6">
      <InsuranceQuestions form={form} />
      <ITSecurityQuestions form={form} />
    </div>
  );
};