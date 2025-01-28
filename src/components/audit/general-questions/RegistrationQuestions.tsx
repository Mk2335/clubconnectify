import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface RegistrationQuestionsProps {
  form: UseFormReturn<any>;
}

export const RegistrationQuestions = ({ form }: RegistrationQuestionsProps) => {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="auditAssociationDisclosed"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is the audit association named on the website or letterhead?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="auditAssociationDisclosed-yes" />
                  <Label htmlFor="auditAssociationDisclosed-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="auditAssociationDisclosed-no" />
                  <Label htmlFor="auditAssociationDisclosed-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="membersWithVotingRights"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Are there members with more than 25% voting rights or shares?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="membersWithVotingRights-yes" />
                  <Label htmlFor="membersWithVotingRights-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="membersWithVotingRights-no" />
                  <Label htmlFor="membersWithVotingRights-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="transparencyRegister"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Is the cooperative registered in the transparency register?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="yes" id="transparencyRegister-yes" />
                  <Label htmlFor="transparencyRegister-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="no" id="transparencyRegister-no" />
                  <Label htmlFor="transparencyRegister-no">No</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="registrationDate"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>When was the registration completed:</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};