import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";

interface MinutesMeetingsSectionProps {
  form: UseFormReturn<any>;
}

export const MinutesMeetingsSection = ({ form }: MinutesMeetingsSectionProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">3. Minutes of meetings of the Executive Board and Supervisory Board</h3>
      
      <FormField
        control={form.control}
        name="noExecutiveBoardMeetings"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>No Executive Board meetings were held during the relevant audit period.</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="no-executive-meetings-yes" />
                  <Label htmlFor="no-executive-meetings-yes">Yes, the cooperative has only one Management Board</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-executive-meetings-no" />
                  <Label htmlFor="no-executive-meetings-no">No, see protocols</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="noSupervisoryBoardMeetings"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <Label>No Supervisory Board meetings were held during the relevant audit period.</Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-row space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="no-supervisory-meetings-yes" />
                  <Label htmlFor="no-supervisory-meetings-yes">Yes, the cooperative has a BV d. GV</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no-supervisory-meetings-no" />
                  <Label htmlFor="no-supervisory-meetings-no">No, see protocols</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          No joint meetings of the Management Board and Supervisory Board were held during the relevant audit period.
        </p>
      </div>
    </div>
  );
};