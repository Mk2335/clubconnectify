import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { CooperativeBodiesSection } from "./bodies/CooperativeBodiesSection";
import { GeneralRulesSection } from "./bodies/GeneralRulesSection";
import { MinutesMeetingsSection } from "./bodies/MinutesMeetingsSection";
import { AnnualGeneralMeetingSection } from "./bodies/AnnualGeneralMeetingSection";

interface BodiesAndRulesSectionProps {
  form: UseFormReturn<any>;
}

export const BodiesAndRulesSection = ({ form }: BodiesAndRulesSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">IV. Bodies, rules of procedure and AGM</h2>
      
      <div className="space-y-8">
        <CooperativeBodiesSection form={form} />
        <GeneralRulesSection form={form} />
        <MinutesMeetingsSection form={form} />
        <AnnualGeneralMeetingSection form={form} />
      </div>
    </Card>
  );
};