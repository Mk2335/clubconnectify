import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useForm } from "react-hook-form";
import AssociationPurposeForm from "@/components/AssociationPurposeForm";
import CompanyDetailsForm from "@/components/CompanyDetailsForm";

const Company = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      street: "",
      postcode: "",
      city: "",
      phone: "",
      email: "",
      licenseEmail: "",
      website: "",
      taxId: "",
      registrationNumber: "",
      taxNumber: "",
      courtRegistry: "",
      iban: "",
      creditorId: "",
      bic: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <SidebarTrigger className="mb-4" />
            <CompanyDetailsForm form={form} onSubmit={onSubmit} />
            <AssociationPurposeForm />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Company;