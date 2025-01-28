import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { DocumentChecklistTab } from "./checklist/DocumentChecklistTab";
import AuditQuestionnaire from "@/pages/AuditQuestionnaire";
import AccountingQuestionnaire from "./AccountingQuestionnaire";
import { ListOfMembersSection } from "./ListOfMembersSection";
import { BodiesAndRulesSection } from "./BodiesAndRulesSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface AuditTabsProps {
  form: UseFormReturn<any>;
  sections: any[];
}

export const AuditTabs = ({ form, sections }: AuditTabsProps) => {
  const { toast } = useToast();
  const [submittedTabs, setSubmittedTabs] = useState<Record<string, boolean>>({});

  const handleSubmit = (tab: string) => {
    setSubmittedTabs(prev => ({ ...prev, [tab]: true }));
    toast({
      title: "Form submitted",
      description: "Your questionnaire has been saved.",
    });
  };

  return (
    <Tabs defaultValue="checklist" className="w-full">
      <TabsList className="w-full mb-8 grid grid-cols-5 bg-muted p-1 rounded-lg">
        <TabsTrigger value="checklist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
          Document Checklist
        </TabsTrigger>
        <TabsTrigger value="questionnaire" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
          Audit Questionnaire
        </TabsTrigger>
        <TabsTrigger value="accounting" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
          Accounting Questionnaire
        </TabsTrigger>
        <TabsTrigger value="members" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
          List of Members
        </TabsTrigger>
        <TabsTrigger value="bodies" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
          Bodies & Rules
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="checklist" className="space-y-6">
        <DocumentChecklistTab sections={sections} isSubmitted={submittedTabs['checklist']} />
        <div className="flex justify-end">
          <Button onClick={() => handleSubmit('checklist')}>Submit Questionnaire</Button>
        </div>
      </TabsContent>

      <TabsContent value="questionnaire" className="space-y-6">
        <AuditQuestionnaire isSubmitted={submittedTabs['questionnaire']} />
        <div className="flex justify-end">
          <Button onClick={() => handleSubmit('questionnaire')}>Submit Questionnaire</Button>
        </div>
      </TabsContent>

      <TabsContent value="accounting" className="space-y-6">
        <AccountingQuestionnaire />
        <div className="flex justify-end">
          <Button onClick={() => handleSubmit('accounting')}>Submit Questionnaire</Button>
        </div>
      </TabsContent>

      <TabsContent value="members" className="space-y-6">
        <ListOfMembersSection />
        <div className="flex justify-end">
          <Button onClick={() => handleSubmit('members')}>Submit Questionnaire</Button>
        </div>
      </TabsContent>

      <TabsContent value="bodies" className="space-y-6">
        <BodiesAndRulesSection form={form} />
        <div className="flex justify-end">
          <Button onClick={() => handleSubmit('bodies')}>Submit Questionnaire</Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};