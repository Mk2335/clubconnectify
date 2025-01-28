import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { QuestionRadioGroup } from "../shared/QuestionRadioGroup";

interface InsuranceQuestionsProps {
  form: UseFormReturn<any>;
}

export const InsuranceQuestions = ({ form }: InsuranceQuestionsProps) => {
  const questions = [
    {
      name: "operationsLiabilityInsurance",
      label: "Besteht eine Betriebshaftlichtversicherung?",
    },
    {
      name: "dAndOInsurance",
      label: "Besteht eine D&O-Versicherung abgeschlossen?",
    },
    {
      name: "propertyDamageInsurance",
      label: "Besteht eine Vermögensschadenhaftlichtversicherung?",
    },
    {
      name: "creditDefaultInsurance",
      label: "Besteht eine Forderungsausfallversicherung?",
    },
    {
      name: "buildingInsuranceCoverage",
      label: "Im Falle von Immobilien: Sind alle Gebäude ausreichend versichert?",
    },
    {
      name: "buildingElementaryInsurance",
      label: "Im Falle von Immobilien: Sind alle Gebäude elementar versichert?",
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Insurance Coverage</h4>
      {questions.map((question) => (
        <QuestionRadioGroup
          key={question.name}
          form={form}
          name={question.name}
          label={question.label}
        />
      ))}
    </div>
  );
};