import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type Control } from "react-hook-form";
import { type ApplicationFormData } from "@/types/memberApplication";

interface ContactFieldsProps {
  control: Control<ApplicationFormData>;
}

export const ContactFields = ({ control }: ContactFieldsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={control}
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
        control={control}
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
        control={control}
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
    </div>
  );
};