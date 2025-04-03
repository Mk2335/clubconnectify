
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Member } from '@/types/member';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Validation schema
const memberFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  status: z.enum(["Active", "Inactive", "Pending"]),
  type: z.enum(["Individual", "Company"]),
  role: z.string().optional(),
  paymentMethod: z.enum(["Bank Transfer", "Direct Debit", "Other"]).optional(),
  companyName: z.string().optional(),
  registrationNumber: z.string().optional(),
  contactPerson: z.string().optional()
});

type MemberFormData = z.infer<typeof memberFormSchema>;

interface MemberFormProps {
  initialData?: Member & { 
    companyDetails?: { 
      companyName?: string; 
      registrationNumber?: string; 
      contactPerson?: string; 
    }; 
  };
  onClose?: () => void;
}

export const MemberForm: React.FC<MemberFormProps> = ({ 
  initialData, 
  onClose 
}) => {
  const [isCompany, setIsCompany] = useState(
    initialData?.type === 'Company' || false
  );

  // Initialize form with initial data or default values
  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      email: initialData.email,
      status: initialData.status,
      type: initialData.type,
      role: initialData.role || '',
      paymentMethod: initialData.paymentMethod,
      companyName: initialData.companyDetails?.companyName || '',
      registrationNumber: initialData.companyDetails?.registrationNumber || '',
      contactPerson: initialData.companyDetails?.contactPerson || ''
    } : {
      name: '',
      email: '',
      status: 'Pending',
      type: 'Individual',
      role: '',
      paymentMethod: 'Other'
    }
  });

  const onSubmit = async (data: MemberFormData) => {
    try {
      // Start a transaction
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .upsert({
          id: initialData?.id,
          name: data.name,
          email: data.email,
          status: data.status,
          type: data.type,
          role: data.role,
          payment_method: data.paymentMethod,
          join_date: initialData?.joinDate || new Date().toISOString()
        })
        .select()
        .single();

      if (memberError) throw memberError;

      // If it's a company, add/update company details
      if (data.type === 'Company' && memberData) {
        await supabase
          .from('company_details')
          .upsert({
            member_id: memberData.id,
            company_name: data.companyName || '',
            registration_number: data.registrationNumber || '',
            contact_person: data.contactPerson || ''
          });
      }

      toast({
        title: initialData ? "Member Updated" : "Member Created",
        description: `${data.name} has been ${initialData ? 'updated' : 'added'} successfully.`
      });

      // Reset form and close modal
      form.reset();
      onClose?.();
    } catch (error) {
      console.error('Error saving member:', error);
      toast({
        title: "Error",
        description: "Failed to save member. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member Type</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  setIsCompany(value === 'Company');
                }} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Company">Company</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isCompany && (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contact person" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Direct Debit">Direct Debit</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          {onClose && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
          <Button type="submit">
            {initialData ? 'Update Member' : 'Create Member'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
