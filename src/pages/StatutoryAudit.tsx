import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Clipboard, FileText, List, Check } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuditQuestionnaire from "./AuditQuestionnaire";
import AccountingQuestionnaire from "@/components/audit/AccountingQuestionnaire";
import { ListOfMembersSection } from "@/components/audit/ListOfMembersSection";

const StatutoryAudit = () => {
  const sections = [
    {
      title: "General Information",
      icon: Clipboard,
      items: [
        { id: "1.0", label: "Declaration of Audit and Completeness", description: "Form with questionnaire for audit according to §§ 53 ff GenG" },
        { id: "1.1", label: "Articles of Association", description: "Current articles of association of the cooperative" },
        { id: "1.2", label: "Business Registration", description: "Current business registration or deregistration" },
        { id: "1.3", label: "Register Extract", description: "Current extract from the cooperative register" },
        { id: "1.4", label: "Real Estate and Company Investments", description: "Form for real estate and company investments > 25%" },
        { id: "1.5", label: "Member Loans", description: "Form for member loans" },
      ],
    },
    {
      title: "Accounting",
      icon: FileText,
      items: [
        { id: "2.0", label: "Declaration on Bookkeeping and Assets", description: "Form with questionnaire for audit according to §§ 53 ff GenG" },
        { id: "2.1", label: "Annual Financial Statements", description: "All annual financial statements of the audit period" },
        { id: "2.2", label: "Total and Balance Lists", description: "Matching the previously submitted annual financial statements" },
        { id: "2.3", label: "General Ledger Accounts", description: "Matching the previously submitted annual financial statements" },
        { id: "2.4", label: "Tax Assessments", description: "Matching the previously submitted annual financial statements" },
        { id: "2.5", label: "Disclosure of Annual Financial Statements", description: "Proof of disclosure of annual financial statements in Federal Gazette" },
        { id: "2.6", label: "Current BWA", description: "Maximum 3 months old" },
      ],
    },
    {
      title: "Member List",
      icon: List,
      items: [
        { id: "3.0", label: "Declaration on Member List Management", description: "Form with questionnaire for audit according to §§ 53 ff GenG" },
        { id: "3.1", label: "Current Member List", description: "With documents of additions and departures at the time of audit" },
        { id: "3.2", label: "Member List at Year End", description: "With documents of additions and departures for each year to be audited" },
      ],
    },
    {
      title: "Minutes & General Assembly",
      icon: Check,
      items: [
        { id: "4.0", label: "Declaration on Bodies, Rules and GA", description: "Form with questionnaire for audit according to §§ 53 ff GenG" },
        { id: "4.1", label: "Rules of Procedure GA, Board and Supervisory Board", description: "Rules if applicable" },
        { id: "4.2", label: "Minutes of Board and Supervisory Board Meetings", description: "Minutes of board and supervisory board meetings if applicable" },
        { id: "4.3", label: "Minutes of General Assemblies in Audit Period", description: "Minutes of all GAs in audit period if applicable" },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <Tabs defaultValue="checklist" className="w-full">
              <TabsList className="w-full mb-8 grid grid-cols-4 bg-muted p-1 rounded-lg">
                <TabsTrigger 
                  value="checklist" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                >
                  Document Checklist
                </TabsTrigger>
                <TabsTrigger 
                  value="questionnaire" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                >
                  Audit Questionnaire
                </TabsTrigger>
                <TabsTrigger 
                  value="accounting" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                >
                  Accounting Questionnaire
                </TabsTrigger>
                <TabsTrigger 
                  value="members" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all"
                >
                  List of Members
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="checklist" className="mt-6 space-y-8">
                <div className="space-y-8">
                  {sections.map((section) => (
                    <Card key={section.title} className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <section.icon className="h-5 w-5 text-primary" />
                        <h2 className="text-xl font-semibold">{section.title}</h2>
                      </div>
                      <div className="space-y-4">
                        {section.items.map((item) => (
                          <div key={item.id} className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <Checkbox id={`checkbox-${item.id}`} />
                                <Label htmlFor={item.id}>{item.label}</Label>
                              </div>
                              <div className="flex gap-4 mt-2">
                                <Select>
                                  <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="option1">Option 1</SelectItem>
                                    <SelectItem value="option2">Option 2</SelectItem>
                                    <SelectItem value="option3">Option 3</SelectItem>
                                  </SelectContent>
                                </Select>
                                <div className="flex-1">
                                  <Input
                                    id={item.id}
                                    type="file"
                                    className="cursor-pointer"
                                  />
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
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
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StatutoryAudit;