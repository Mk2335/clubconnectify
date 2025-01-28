import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface QuestionRadioGroupProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
}

export const QuestionRadioGroup = ({ form, name, label }: QuestionRadioGroupProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-row space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${name}-yes`} />
                <label htmlFor={`${name}-yes`}>Ja</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${name}-no`} />
                <label htmlFor={`${name}-no`}>Nein</label>
              </div>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );
};