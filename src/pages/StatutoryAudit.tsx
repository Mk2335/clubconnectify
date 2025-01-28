import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Clipboard, FileText, List, Check, Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const StatutoryAudit = () => {
  const sections = [
    {
      title: "General Part of the Audit",
      icon: Upload,
      items: [
        { id: "statute", label: "Statute of Coop", description: "Upload or select the cooperative's statute" },
        { id: "trade", label: "Trade registration", description: "Upload or select trade registration documents" },
        { id: "register", label: "Register extract", description: "Upload or select register extract" },
        { id: "estate", label: "Real estate", description: "Upload or select real estate documentation" },
        { id: "loans", label: "Member loans", description: "Upload or select member loans documentation" },
      ],
    },
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(`File uploaded for ${itemId}:`, file.name);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <SidebarTrigger className="mb-4" />
            <div className="flex items-center gap-4 mb-8">
              <img src="/lovable-uploads/0ffffc52-e45d-470a-817a-3232fefab2f4.png" alt="digiAUDIT" className="h-8" />
              <h1 className="text-3xl font-bold">Statutory Audit Checklist</h1>
            </div>
            <p className="text-lg text-muted-foreground mb-8">
              Required documents for conducting the mandatory audit according to §§ 53 ff GenG
            </p>
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
                        {section.title === "General Part of the Audit" ? (
                          <div className="flex-1">
                            <Label htmlFor={item.id}>{item.label}</Label>
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
                                  onChange={(e) => handleFileUpload(e, item.id)}
                                />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          </div>
                        ) : (
                          <>
                            <Checkbox id={item.id} />
                            <div>
                              <label htmlFor={item.id} className="font-medium block">
                                {item.label}
                              </label>
                              <p className="text-sm text-muted-foreground">
                                {item.description}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StatutoryAudit;