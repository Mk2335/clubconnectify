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
import { useEffect, useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  // Handle resize observer warnings with debounce
  const handleResize = useCallback(
    debounce(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100),
    []
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel();
    };
  }, [handleResize]);

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
                
                {/* Search and Filter Section */}
                <div className="mt-4 space-y-4">
                  <div className="flex gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <Input
                        type="text"
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select
                      value={filterValue}
                      onValueChange={setFilterValue}
                    >
                      <SelectTrigger className="w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Applications</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

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