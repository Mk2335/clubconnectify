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

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street and House Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Address Information</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emailConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID (if available)</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="membershipType"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value === "new"}
                                onCheckedChange={() => field.onChange("new")}
                              />
                            </FormControl>
                            <FormLabel>
                              I want to become a member and declare my intention to join Sample Co-op. 
                              I would like to participate with the following number of shares at €100.00 each:
                            </FormLabel>
                          </div>

                          {field.value === "new" && (
                            <FormField
                              control={form.control}
                              name="shares"
                              render={({ field: sharesField }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      className="w-32"
                                      {...sharesField}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}

                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value === "existing"}
                                onCheckedChange={() => field.onChange("existing")}
                              />
                            </FormControl>
                            <div className="flex items-center space-x-2">
                              <FormLabel>
                                I am already a member with member number
                              </FormLabel>
                              <FormField
                                control={form.control}
                                name="memberId"
                                render={({ field: memberIdField }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        className="w-32"
                                        {...memberIdField}
                                        disabled={field.value !== "existing"}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        name: "acceptTerms",
                        label: "I commit to making the required payments for the share(s) according to law and statute."
                      },
                      {
                        name: "acceptNotice",
                        label: "I acknowledge that the notice period according to the statute is 2 years."
                      },
                      {
                        name: "isInvestingMember",
                        label: "[If applicable:] I would like to be admitted as an investing member of the cooperative"
                      },
                      {
                        name: "acceptLiability",
                        label: "[If applicable:] I commit to making the additional contributions required to satisfy creditors up to the amount specified in the statute as limited/unlimited liability."
                      },
                      {
                        name: "acceptFees",
                        label: "[If applicable:] I acknowledge that the statute includes additional payment obligations (admission fee of €50.00 and monthly membership fee of €10.00)."
                      },
                      {
                        name: "acceptDocuments",
                        label: "The statute [link] and privacy policy [link] have been made available to me for download."
                      }
                    ].map((item) => (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name={item.name as keyof ApplicationFormData}
                        render={({ field }) => (
                          <FormItem className="flex items-top space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => field.onChange(checked)}
                              />
                            </FormControl>
                            <FormLabel className="text-sm">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

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