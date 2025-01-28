import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { DocumentChecklistTab } from "./checklist/DocumentChecklistTab";
import AuditQuestionnaire from "@/pages/AuditQuestionnaire";
import AccountingQuestionnaire from "./AccountingQuestionnaire";
import { ListOfMembersSection } from "./ListOfMembersSection";
import { BodiesAndRulesSection } from "./BodiesAndRulesSection";

interface AuditTabsProps {
  form: UseFormReturn<any>;
  sections: any[];
}

export const AuditTabs = ({ form, sections }: AuditTabsProps) => {
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
      
      <TabsContent value="checklist">
        <DocumentChecklistTab sections={sections} />
      </TabsContent>

      <TabsContent value="questionnaire">
        <AuditQuestionnaire />
      </TabsContent>

      <TabsContent value="accounting">
        <AccountingQuestionnaire />
      </TabsContent>

      <TabsContent value="members">
        <ListOfMembersSection />
      </TabsContent>

      <TabsContent value="bodies">
        <BodiesAndRulesSection form={form} />
      </TabsContent>
    </Tabs>
  );
};