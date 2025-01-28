import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { Progress } from "@/components/ui/progress";
import { useFormProgress } from "@/hooks/useFormProgress";
import { CooperativeBodiesSection } from "./bodies/CooperativeBodiesSection";
import { GeneralRulesSection } from "./bodies/GeneralRulesSection";
import { MinutesMeetingsSection } from "./bodies/MinutesMeetingsSection";
import { AnnualGeneralMeetingSection } from "./bodies/AnnualGeneralMeetingSection";

interface BodiesAndRulesSectionProps {
  form: UseFormReturn<any>;
  isSubmitted?: boolean;
}

export const BodiesAndRulesSection = ({ form, isSubmitted = false }: BodiesAndRulesSectionProps) => {
  const progress = useFormProgress(form);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">IV. Bodies, rules of procedure and AGM</h2>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isSubmitted ? "Section Submitted" : "Completion Progress"}
            </p>
            <span className="text-sm font-medium">{progress}%</span>
          </div>
          <Progress value={isSubmitted ? 100 : progress} className="h-2" />
        </div>
        
        <div className="space-y-8">
          <CooperativeBodiesSection form={form} />
          <GeneralRulesSection form={form} />
          <MinutesMeetingsSection form={form} />
          <AnnualGeneralMeetingSection form={form} />
        </div>
      </div>
    </Card>
  );
};