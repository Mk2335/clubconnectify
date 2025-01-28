import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StatutesFormData {
  name: string;
  purpose: string;
  headquarters: string;
  businessYear: string;
  shareValue: string;
  membershipRights: string;
  membershipObligations: string;
  boardStructure: string;
  generalAssembly: string;
}

const StatutesForm = () => {
  const form = useForm<StatutesFormData>();
  const { toast } = useToast();

  const onSubmit = (data: StatutesFormData) => {
    console.log(data);
    toast({
      title: "Form submitted",
      description: "Your statutes details have been saved.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cooperative Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter cooperative name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headquarters"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headquarters Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter headquarters location" {...field} />
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
              Purpose and Business Year
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cooperative Purpose</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter cooperative purpose"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Year</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., January 1 - December 31" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Membership Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
              name="membershipRights"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Rights</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter membership rights"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="membershipObligations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Membership Obligations</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter membership obligations"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Statutes</Button>
        </div>
      </form>
    </Form>
  );
};

export default StatutesForm;