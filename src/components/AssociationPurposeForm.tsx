import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

const ASSOCIATION_PURPOSES = [
  "The promotion the fight against poverty (e.g. in youth and elderly care)",
  "The promotion of education in relation to sexuality, diseases, addiction, violence or abuse, which is significantly based on evaluated, generally recognized scientific findings",
  "The promotion of equality, tolerance and aid against discrimination and development cooperation",
  "The promotion of crime prevention and care for prisoners and former prisoners",
  "The promotion of fire, labour, disaster and civil protection as well as accident prevention and rescue from life-threatening situations",
  "The promotion of aid to those politically, racially or religiously persecuted, refugees, displaced persons, emigrants, victims of war, survivors of war, war victims and prisoners of war, civilians and the disabled, and assistance to victims of crime",
  "The promotion of nature conservation, environmental protection, coastal protection and flood protection, as well as animal welfare",
  "The prevention and control of communicable diseases, diseases or other generally scientifically recognized threats to public health",
  "The promotion of care for mentally or physically ill people"
];

interface FormValues {
  purposes: string[];
  exactPurpose: string;
}

const AssociationPurposeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      purposes: [],
      exactPurpose: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Form submitted",
      description: "Your association purposes have been saved.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Purpose of the Association
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-sm text-muted-foreground">
              <p>Below are all the association purposes supported.</p>
              <p className="mt-2">Please select all the purposes of the association which correspond to your association purpose according to the statutes.</p>
              <p className="mt-2">There should be an exact match of your association's purpose according to the statutes and exemption notice with the association's purposes we support.</p>
            </div>

            <div className="space-y-4">
              {ASSOCIATION_PURPOSES.map((purpose, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name="purposes"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(purpose)}
                          onCheckedChange={(checked) => {
                            const currentValues = field.value || [];
                            if (checked) {
                              field.onChange([...currentValues, purpose]);
                            } else {
                              field.onChange(currentValues.filter((value) => value !== purpose));
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {purpose}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <FormField
              control={form.control}
              name="exactPurpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Please enter here the exact wording of your association's purpose from your association statutes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the exact wording of your association's purpose..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default AssociationPurposeForm;