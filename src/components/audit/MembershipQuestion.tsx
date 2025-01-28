import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MembershipQuestionProps {
  question: string;
  value: string;
  field: string;
  onValueChange: (field: string, value: string) => void;
  yesLabel?: string;
  noLabel?: string;
}

export const MembershipQuestion = ({
  question,
  value,
  field,
  onValueChange,
  yesLabel = "Yes",
  noLabel = "No"
}: MembershipQuestionProps) => {
  return (
    <div className="bg-muted/50 p-4 rounded-lg">
      <p className="mb-4">{question}</p>
      <RadioGroup
        className="flex gap-8"
        value={value}
        onValueChange={(value) => onValueChange(field, value)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id={`${field}-yes`} />
          <Label htmlFor={`${field}-yes`}>{yesLabel}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id={`${field}-no`} />
          <Label htmlFor={`${field}-no`}>{noLabel}</Label>
        </div>
      </RadioGroup>
    </div>
  );
};