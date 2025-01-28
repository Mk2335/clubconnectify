import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { type Control } from "react-hook-form";
import { type ApplicationFormData } from "@/types/memberApplication";

interface MembershipTypeFieldsProps {
  control: Control<ApplicationFormData>;
}

export const MembershipTypeFields = ({ control }: MembershipTypeFieldsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
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
                control={control}
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
                  control={control}
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
  );
};