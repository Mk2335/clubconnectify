import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { FileText, Clipboard, List, Check, Users } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { AuditTabs } from "@/components/audit/AuditTabs";

const StatutoryAudit = () => {
  const form = useForm({
    defaultValues: {
      noSupervisoryBoard: "",
      authorizedRepresentativeMember: "",
      bodiesUnchanged: "",
      managementBoard: {
        chairman: "",
        deputyChairman: "",
        member: "",
      },
      authorisedRepresentative: {
        representative: "",
        deputy: "",
      },
      supervisoryBoard: {
        chairman: "",
        deputyChairman: "",
        member1: "",
        member2: "",
        member3: "",
      },
    },
  });

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
            <div className="flex items-center gap-4 mb-4">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Audit Questionnaire</h1>
            </div>
            <Form {...form}>
              <form>
                <AuditTabs form={form} sections={sections} />
              </form>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StatutoryAudit;