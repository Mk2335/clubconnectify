import { UseFormReturn } from "react-hook-form";
import { QuestionRadioGroup } from "../shared/QuestionRadioGroup";

interface ITSecurityQuestionsProps {
  form: UseFormReturn<any>;
}

export const ITSecurityQuestions = ({ form }: ITSecurityQuestionsProps) => {
  const questions = [
    {
      name: "electronicDataProcessing",
      label: "Es wird eine elektronische Datenverarbeitung durchgeführt",
    },
    {
      name: "itHardwareMonitoring",
      label: "Die IT-Hardware wird durch einen Dienstleister überwacht",
    },
    {
      name: "cloudBasedSoftware",
      label: "Die IT-Software ist Cloudbasiert (Inhouse = Nein)",
    },
    {
      name: "dailyDataBackup",
      label: "Es erfolgt eine tägliche Datensicherung",
    },
    {
      name: "dataProtectionGuideline",
      label: "Die Genossenschaft hat eine Datenschutzrichtlinie",
    },
    {
      name: "gdprCompliance",
      label: "Die DSGVO ist in allen Punkten bzgl. der Genossenschaft eingehalten",
    },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-medium">IT & Data Protection</h4>
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