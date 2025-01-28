import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { type Control } from "react-hook-form";
import { type ApplicationFormData } from "@/types/memberApplication";

interface TermsFieldsProps {
  control: Control<ApplicationFormData>;
}

export const TermsFields = ({ control }: TermsFieldsProps) => {
  const terms = [
    {
      name: "acceptTerms" as const,
      label: "I commit to making the required payments for the share(s) according to law and statute."
    },
    {
      name: "acceptNotice" as const,
      label: "I acknowledge that the notice period according to the statute is 2 years."
    },
    {
      name: "isInvestingMember" as const,
      label: "[If applicable:] I would like to be admitted as an investing member of the cooperative"
    },
    {
      name: "acceptLiability" as const,
      label: "[If applicable:] I commit to making the additional contributions required to satisfy creditors up to the amount specified in the statute as limited/unlimited liability."
    },
    {
      name: "acceptFees" as const,
      label: "[If applicable:] I acknowledge that the statute includes additional payment obligations (admission fee of €50.00 and monthly membership fee of €10.00)."
    },
    {
      name: "acceptDocuments" as const,
      label: "The statute [link] and privacy policy [link] have been made available to me for download."
    }
  ];

  return (
    <div className="space-y-4">
      {terms.map((item) => (
        <FormField
          key={item.name}
          control={control}
          name={item.name}
          render={({ field }) => (
            <FormItem className="flex items-top space-x-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="text-sm">
                {item.label}
              </FormLabel>
            </FormItem>
          )}
        />
      ))}
    </div>
  );
};