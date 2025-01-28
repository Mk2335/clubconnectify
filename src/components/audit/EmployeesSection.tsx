import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";

interface EmployeesSectionProps {
  form: UseFormReturn<any>;
}

export const EmployeesSection = ({ form }: EmployeesSectionProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">III. Employees</h2>
      
      <div className="space-y-6">
        <div>
          <Label className="text-base mb-4">The cooperative had no employees during the relevant audit period:</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="employees-yes" />
              <Label htmlFor="employees-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="employees-no" />
              <Label htmlFor="employees-no">No, specifically:</Label>
            </div>
          </RadioGroup>
          <FormField
            control={form.control}
            name="employeesDescription"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl>
                  <Textarea 
                    placeholder="Enter details about employees..."
                    className="h-20"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div>
          <Label className="text-base mb-4">There were no legal disputes in connection with employment contracts and relationships:</Label>
          <RadioGroup className="mt-2 flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="disputes-yes" />
              <Label htmlFor="disputes-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="disputes-no" />
              <Label htmlFor="disputes-no">No, specifically:</Label>
            </div>
          </RadioGroup>
          <FormField
            control={form.control}
            name="legalDisputesDescription"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormControl>
                  <Textarea 
                    placeholder="Describe legal disputes (number, value, brief description)..."
                    className="h-20"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
};