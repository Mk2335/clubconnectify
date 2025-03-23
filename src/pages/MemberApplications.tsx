
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
import { Search, Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/layout/AppLayout";

const MemberApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [showForm, setShowForm] = useState(false);

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

  useEffect(() => {
    fetchApplications();
  }, [filterValue]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      let query = supabase.from('member_applications').select('*');
      
      if (filterValue !== 'all') {
        query = query.eq('status', filterValue);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      const { error } = await supabase.from('member_applications').insert([{
        first_name: data.firstName,
        last_name: data.lastName,
        street: data.street,
        additional_address: data.additionalAddress,
        zip_code: data.zipCode,
        city: data.city,
        email: data.email,
        tax_id: data.taxId,
        shares: data.shares,
        membership_type: data.membershipType,
        member_id: data.memberId,
        accept_terms: data.acceptTerms,
        accept_notice: data.acceptNotice,
        is_investing_member: data.isInvestingMember,
        accept_liability: data.acceptLiability,
        accept_fees: data.acceptFees,
        accept_documents: data.acceptDocuments
      }]);
      
      if (error) throw error;
      
      toast({
        title: "Application Submitted",
        description: "Your membership application has been submitted successfully.",
      });
      
      form.reset();
      setShowForm(false);
      fetchApplications();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredApplications = applications.filter(app => 
    app.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout title="Membership Applications">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-muted-foreground">
              Manage new membership applications and share increases
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? "Cancel" : "New Application"}
          </Button>
        </div>
        
        {showForm ? (
          <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold">New Membership Application</h2>
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
        ) : (
          <>
            <div className="mb-6 space-y-4">
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

            {loading ? (
              <div className="text-center py-8">
                <p>Loading applications...</p>
              </div>
            ) : filteredApplications.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg border">
                <p className="text-muted-foreground">No applications found.</p>
                <Button 
                  variant="outline" 
                  onClick={() => setShowForm(true)} 
                  className="mt-4"
                >
                  Create New Application
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium">Name</th>
                      <th className="text-left py-3 px-4 font-medium">Email</th>
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4">{`${app.first_name} ${app.last_name}`}</td>
                        <td className="py-3 px-4">{app.email}</td>
                        <td className="py-3 px-4">{app.membership_type === 'new' ? 'New Member' : 'Existing Member'}</td>
                        <td className="py-3 px-4">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            app.status === 'approved' 
                              ? 'bg-green-100 text-green-800' 
                              : app.status === 'rejected' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </div>
                        </td>
                        <td className="py-3 px-4">{new Date(app.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default MemberApplications;
