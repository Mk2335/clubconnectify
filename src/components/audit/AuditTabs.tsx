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
import { FileText, ClipboardCheck, Calculator, Users, Building2 } from "lucide-react";

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

  const tabs = [
    { id: "checklist", label: "Document Checklist", icon: ClipboardCheck },
    { id: "questionnaire", label: "Audit Questionnaire", icon: FileText },
    { id: "accounting", label: "Accounting Questionnaire", icon: Calculator },
    { id: "members", label: "List of Members", icon: Users },
    { id: "bodies", label: "Bodies & Rules", icon: Building2 },
  ];

  return (
    <Tabs defaultValue="checklist" className="w-full">
      <TabsList className="w-full mb-8 grid grid-cols-5 bg-muted/50 p-1 rounded-lg">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
          >
            <tab.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="space-y-6">
          <div className="bg-card rounded-lg border shadow-sm">
            <div className="flex items-center gap-2 p-6 border-b">
              <tab.icon className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">{tab.label}</h2>
            </div>
            <div className="p-6">
              {tab.id === "checklist" && (
                <DocumentChecklistTab sections={sections} isSubmitted={submittedTabs[tab.id]} />
              )}
              {tab.id === "questionnaire" && (
                <AuditQuestionnaire isSubmitted={submittedTabs[tab.id]} />
              )}
              {tab.id === "accounting" && (
                <AccountingQuestionnaire />
              )}
              {tab.id === "members" && (
                <ListOfMembersSection />
              )}
              {tab.id === "bodies" && (
                <BodiesAndRulesSection form={form} />
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={() => handleSubmit(tab.id)}
              className="bg-primary hover:bg-primary/90"
            >
              Submit {tab.label}
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};