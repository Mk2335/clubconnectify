import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Building2, FileText, DollarSign, List } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FoundingMember {
  name: string;
  email: string;
  group: string;
  address: string;
}

interface IncorporationFormData {
  foundingMembers: FoundingMember[];
  coopName: string;
  address: string;
  incorporationType: string;
  businessPurpose: string;
  shareValue: string;
  publicationNewspaper: string;
  businessPlan: string;
  auditingAssociation: string;
}

const AUDITING_ASSOCIATIONS = [
  "German Cooperative and Raiffeisen Confederation",
  "Baden-Württembergischer Genossenschaftsverband",
  "Genossenschaftsverband Bayern",
  "Genossenschaftsverband Weser-Ems",
  "Rheinisch-Westfälischer Genossenschaftsverband"
];

const IncorporationForm = () => {
  const form = useForm<IncorporationFormData>({
    defaultValues: {
      foundingMembers: Array(3).fill({
        name: "",
        email: "",
        group: "Regular Member",
        address: ""
      })
    }
  });
  const { toast } = useToast();

  const onSubmit = (data: IncorporationFormData) => {
    if (data.foundingMembers.length < 3) {
      toast({
        title: "Validation Error",
        description: "At least 3 founding members are required.",
        variant: "destructive"
      });
      return;
    }
    console.log(data);
    toast({
      title: "Form submitted",
      description: "Your incorporation details have been saved.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Founding Members and Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[0, 1, 2].map((index) => (
              <div key={index} className="grid gap-4 md:grid-cols-2 p-4 border rounded-lg">
                <FormField
                  control={form.control}
                  name={`foundingMembers.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name {index < 3 && "*"}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter member name" {...field} required={index < 3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`foundingMembers.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email {index < 3 && "*"}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Enter email address" {...field} required={index < 3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`foundingMembers.${index}.address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address {index < 3 && "*"}</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter address" {...field} required={index < 3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`foundingMembers.${index}.group`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Member Type {index < 3 && "*"}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select member type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Regular Member">Regular Member</SelectItem>
                          <SelectItem value="Board Member">Board Member</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Incorporation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="incorporationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Incorporation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter incorporation type" {...field} />
                  </FormControl>
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
                    <Textarea placeholder="Enter business purpose" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <List className="h-5 w-5" />
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
                    <Input type="number" placeholder="Enter share value" {...field} />
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Business Plan & Economics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="businessPlan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Plan Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter business plan and economic details"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
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
                        <SelectValue placeholder="Select an auditing association" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {AUDITING_ASSOCIATIONS.map((association) => (
                        <SelectItem key={association} value={association}>
                          {association}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Submit Incorporation Details</Button>
        </div>
      </form>
    </Form>
  );
};

export default IncorporationForm;
