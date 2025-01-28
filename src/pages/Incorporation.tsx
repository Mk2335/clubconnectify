import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building, FileText, Database, Users, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface IncorporationFormData {
  // Founding Members
  foundingMembers: string;
  
  // Cooperative Details
  coopName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  
  // Incorporation Details
  incorporationType: string;
  businessPurpose: string;
  
  // Additional Information
  shareValue: string;
  publicationNewspaper: string;
  
  // Business Plan
  businessPlan: string;
  economicPlan: string;
  
  // Auditing
  auditingAssociation: string;
}

const Incorporation = () => {
  const form = useForm<IncorporationFormData>();

  const onSubmit = (data: IncorporationFormData) => {
    console.log(data);
    toast({
      title: "Form submitted",
      description: "Your incorporation details have been saved.",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <SidebarTrigger className="mb-4" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Founding Members Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Founding Members
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="foundingMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>List of Founding Members</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter the names of founding members..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Cooperative Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5" />
                      Cooperative Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="coopName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of Cooperative</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter cooperative name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter street address" {...field} />
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
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ZIP Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter ZIP code" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter country" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Incorporation Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Incorporation Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="incorporationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Type of Incorporation</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select incorporation type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="registered">Registered Cooperative</SelectItem>
                              <SelectItem value="small">Small Cooperative</SelectItem>
                              <SelectItem value="social">Social Cooperative</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="businessPurpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Purpose</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the purpose of your cooperative..."
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Info className="h-5 w-5" />
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="shareValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Share Value</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter share value" type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="publicationNewspaper"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Publication Newspaper</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter publication newspaper" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Business Plan & Economics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Business Plan & Economics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="businessPlan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Plan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your business plan..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="economicPlan"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Economic Plan</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your economic plan..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Auditing Association */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Auditing Association
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="auditingAssociation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Auditing Association</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select auditing association" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="association1">Auditing Association 1</SelectItem>
                              <SelectItem value="association2">Auditing Association 2</SelectItem>
                              <SelectItem value="association3">Auditing Association 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end">
                  <Button type="submit" size="lg">
                    Save Incorporation Details
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Incorporation;