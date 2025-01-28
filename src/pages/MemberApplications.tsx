import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

interface ApplicationFormData {
  firstName: string;
  lastName: string;
  street: string;
  additionalAddress: string;
  zipCode: string;
  city: string;
  email: string;
  emailConfirm: string;
  taxId: string;
  shares: number;
  membershipType: "new" | "existing";
  memberId?: string;
  acceptTerms: boolean;
  acceptNotice: boolean;
  isInvestingMember: boolean;
  acceptLiability: boolean;
  acceptFees: boolean;
  acceptDocuments: boolean;
}

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

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...form.register("firstName")} />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...form.register("lastName")} />
                    </FormControl>
                  </FormItem>
                </div>

                <FormItem>
                  <FormLabel>Street and House Number</FormLabel>
                  <FormControl>
                    <Input {...form.register("street")} />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Additional Address Information</FormLabel>
                  <FormControl>
                    <Input {...form.register("additionalAddress")} />
                  </FormControl>
                </FormItem>

                <div className="grid grid-cols-2 gap-4">
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl>
                      <Input {...form.register("zipCode")} />
                    </FormControl>
                  </FormItem>

                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...form.register("city")} />
                    </FormControl>
                  </FormItem>
                </div>

                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...form.register("email")} />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Confirm Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" {...form.register("emailConfirm")} />
                  </FormControl>
                </FormItem>

                <FormItem>
                  <FormLabel>Tax ID (if available)</FormLabel>
                  <FormControl>
                    <Input {...form.register("taxId")} />
                  </FormControl>
                </FormItem>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="new-member"
                      checked={form.watch("membershipType") === "new"}
                      onCheckedChange={() => form.setValue("membershipType", "new")}
                    />
                    <Label htmlFor="new-member">
                      I want to become a member and declare my intention to join Sample Co-op. 
                      I would like to participate with the following number of shares at €100.00 each:
                    </Label>
                  </div>

                  {form.watch("membershipType") === "new" && (
                    <Input
                      type="number"
                      min="1"
                      className="w-32"
                      {...form.register("shares", { valueAsNumber: true })}
                    />
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="existing-member"
                      checked={form.watch("membershipType") === "existing"}
                      onCheckedChange={() => form.setValue("membershipType", "existing")}
                    />
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="existing-member">
                        I am already a member with member number
                      </Label>
                      <Input
                        className="w-32"
                        {...form.register("memberId")}
                        disabled={form.watch("membershipType") !== "existing"}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-top space-x-2">
                    <Checkbox id="terms" {...form.register("acceptTerms")} />
                    <Label htmlFor="terms" className="text-sm">
                      I commit to making the required payments for the share(s) according to law and statute.
                    </Label>
                  </div>

                  <div className="flex items-top space-x-2">
                    <Checkbox id="notice" {...form.register("acceptNotice")} />
                    <Label htmlFor="notice" className="text-sm">
                      I acknowledge that the notice period according to the statute is 2 years.
                    </Label>
                  </div>

                  <div className="flex items-top space-x-2">
                    <Checkbox id="investing" {...form.register("isInvestingMember")} />
                    <Label htmlFor="investing" className="text-sm">
                      [If applicable:] I would like to be admitted as an investing member of the cooperative
                    </Label>
                  </div>

                  <div className="flex items-top space-x-2">
                    <Checkbox id="liability" {...form.register("acceptLiability")} />
                    <Label htmlFor="liability" className="text-sm">
                      [If applicable:] I commit to making the additional contributions required to satisfy creditors 
                      up to the amount specified in the statute as limited/unlimited liability.
                    </Label>
                  </div>

                  <div className="flex items-top space-x-2">
                    <Checkbox id="fees" {...form.register("acceptFees")} />
                    <Label htmlFor="fees" className="text-sm">
                      [If applicable:] I acknowledge that the statute includes additional payment obligations 
                      (admission fee of €50.00 and monthly membership fee of €10.00).
                    </Label>
                  </div>

                  <div className="flex items-top space-x-2">
                    <Checkbox id="documents" {...form.register("acceptDocuments")} />
                    <Label htmlFor="documents" className="text-sm">
                      The statute [link] and privacy policy [link] have been made available to me for download.
                    </Label>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Submit Membership Application
                </Button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MemberApplications;