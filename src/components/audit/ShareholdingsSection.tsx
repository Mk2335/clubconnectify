import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";

interface ShareholdingsSectionProps {
  form: UseFormReturn<any>;
}

export const ShareholdingsSection = ({ form }: ShareholdingsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shareholdings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="hasShareholdings"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do you have any shareholdings/affiliated companies (§ 271 Abs. 1 HGB i.V.m. § 336 Abs. 2 Satz 1 HGB)?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hasShareholdings-yes" />
                    <Label htmlFor="hasShareholdings-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hasShareholdings-no" />
                    <Label htmlFor="hasShareholdings-no">No</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shareholdingsPurpose"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Do the shareholdings exclusively serve the statutory promotional purpose and promotional mandate of the cooperative?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="shareholdingsPurpose-yes" />
                    <Label htmlFor="shareholdingsPurpose-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="shareholdingsPurpose-no" />
                    <Label htmlFor="shareholdingsPurpose-no">No</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shareholdingsJustification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Justification</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="significantContracts"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Has the cooperative concluded any significant contracts during the relevant audit period? (Real estate purchases, company shareholdings >25%)</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="significantContracts-yes" />
                    <Label htmlFor="significantContracts-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="significantContracts-no" />
                    <Label htmlFor="significantContracts-no">No, see form for real estate and shareholdings</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};