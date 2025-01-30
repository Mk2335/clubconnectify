/**
 * Contact information form fields component for member applications
 * Handles email, email confirmation, and tax ID inputs with validation
 */

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
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
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                id="email"
                placeholder="Enter your email address"
                aria-describedby="email-description"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="emailConfirm"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="emailConfirm">Confirm Email Address</FormLabel>
            <FormControl>
              <Input 
                type="email" 
                id="emailConfirm"
                placeholder="Confirm your email address"
                aria-describedby="email-confirm-description"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="taxId"
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor="taxId">Tax ID (if available)</FormLabel>
            <FormControl>
              <Input 
                id="taxId"
                placeholder="Enter your tax ID (optional)"
                aria-describedby="tax-id-description"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};