import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { type ApplicationFormData } from "@/types/memberApplication";
import { PersonalInfoFields } from "@/components/member-applications/PersonalInfoFields";
import { ContactFields } from "@/components/member-applications/ContactFields";
import { MembershipTypeFields } from "@/components/member-applications/MembershipTypeFields";
import { TermsFields } from "@/components/member-applications/TermsFields";

const MemberApplications = () => {
  const form = useForm<ApplicationFormData>({
    defaultValues: {
      membershipType: "new",
      shares: 1,
      acceptTerms: false,
      acceptNotice: false,
      isInvestingMember: false,
      acceptLiability: false,
      acceptFees: false,
      acceptDocuments: false,
    },
  });

  const onSubmit = (data: ApplicationFormData) => {
    console.log(data);
    toast({
      title: "Application Submitted",
      description: "Your membership application has been submitted successfully.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            <SidebarTrigger className="mb-4" />
            
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold">Membership Application / Share Increase</h1>
                <h2 className="text-lg font-semibold mt-6 mb-4">Personal Information</h2>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <PersonalInfoFields control={form.control} />
                  <ContactFields control={form.control} />
                  <MembershipTypeFields control={form.control} />
                  <TermsFields control={form.control} />

                  <Button type="submit" className="w-full">
                    Submit Membership Application
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MemberApplications;